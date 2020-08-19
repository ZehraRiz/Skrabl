import React, { useState, useEffect } from "react";
import Board from "../components/Board";
import TileRack from "./TileRack";
import StatusBar from "./StatusBar";
import Chat from "./Chat";
import GameButtons from "./GameButtons";
import ExchangeTilesButtons from "./ExchangeTilesButtons";
import ConfirmModal from "./ConfirmModal";
import GameOverModal from "./GameOverModal";
import ChatModal from "./ChatModal";
import { generateBoardSquares } from "../utils/generateBoardSquares";
import { shuffle } from "../utils/shuffle";
import { moveIsValid } from "../utils/moveIsValid";
import { squaresAreOccupied } from "../utils/squaresAreOccupied";
import { findWordsOnBoard } from "../utils/findWordsOnBoard";
import { getTurnPoints } from "../utils/getTurnPoints";
import { handleBlankTiles } from "../utils/handleBlankTiles";
import { bonusSquareIndices } from "../assets/bonusSquareIndices";
import { Fade } from "react-awesome-reveal";
import { useBeforeunload } from "react-beforeunload";
import axios from "axios";
import shuffleSound from "../assets/shuffle.wav";
import placeTileSound from "../assets/placeTile.wav";
import removeTileSound from "../assets/removeTile.wav";
import correctSound from "../assets/correct.wav";
import invalidSound from "../assets/invalid.wav";
import { notifications } from "../assets/notifications";
import "../styles/GameScreen.css";

const GameScreen = ({
  user,
  invitedPlayer,
  setNotification,
  setCurrentComponent,
  currentPlayer,
  gameData,
  socket,
  gameMode,
  handleClickChat,
  viewChat,
  handleNewChatMsg,
  resetChatMsg,
  lang,
  setGameMode,
  level,
  setInviteSent,
  setInvitedPlayer,
  setGameId,
  setGameData,
  mute,
}) => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedSquareIndex, setSelectedSquareIndex] = useState(null);
  const [playerRackTiles, setPlayerRackTiles] = useState([]);
  const [placedTiles, setPlacedTiles] = useState([]);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [boardState, setBoardState] = useState([]);
  const [timeLeftPlayer, setTimeLeftPlayer] = useState(20);
  const [timeLeftOpponent, setTimeLeftOpponent] = useState(20);
  const [scores, setScores] = useState({ 0: 0, 1: 0 });
  const [wordsOnBoard, setWordsOnBoard] = useState(null);
  const [highestScoringWord, setHighestScoringWord] = useState({
    word: "",
    points: 0,
    player: null,
  });
  const [turn, setTurn] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [tilesToExchange, setTilesToExchange] = useState([]);
  const [boardIsDisabled, setBoardIsDisabled] = useState(false);
  const [consecutivePasses, setConsecutivePasses] = useState(0);
  const [computerConsecutivePasses, setComputerConsecutivePasses] = useState(0);
  const [pouch, setPouch] = useState([]);
  const [computerRackTiles, setComputerRackTiles] = useState([]);
  const fillPouch = async () => {
    const res = await axios.post("http://localhost:4001/getPouch", {
      lang,
    });
    setPouch(res.data);
  };
  const moment = require("moment");
  let now = moment();
  const [newMessage, setNewMessage] = useState();
  const [chatThread, setChatThread] = useState([
    {
      playerFromBackend: 0,
      playerName: "SkrablBot",
      msg: notifications["Welcome, you are now connected."][lang],
      date: now.format("h:mm:ss a"),
    },
  ]);
  const [turnWords, setTurnWords] = useState([]);
  const [timeWarning, setTimeWarning] = useState(false);
  const [endedBy, setEndedBy] = useState(0);
  const [blankTileLetter, setBlankTileLetter] = useState("");
  const [dragTileId, setDragTileId] = useState(null);
  const [dragOriginIndex, setDragOriginIndex] = useState(null);

  useBeforeunload(
    () => notifications["Are you sure you want to leave the game?"][lang]
  );

  //CHAT FUNCTIONS
  //______________________________________________________________________________
  useEffect(() => {
    if (gameMode === "Online") {
      socket.on("receiveMsg", (data) => {
        setNewMessage(data);
        handleNewChatMsg();
      });
      socket.on("chatError", (data) => console.log(data));
    }
  }, []);

  useEffect(() => {
    if (newMessage) {
      setChatThread([...chatThread, newMessage]);
      setNewMessage(null);
    }
  }, [newMessage]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newMessage = e.target.message.value;
    socket.emit("sendMsg", {
      token,
      gameId: gameData.gameId,
      currentPlayer,
      newMessage,
    });
    e.target.reset();
  };

  //______________________________________________________________________________

  //GAME INITIALIZATION AND TASKS AUTOMATICALLY PERFORMED
  //______________________________________________________________________________
  useEffect(() => {
    if (turn !== null) {
      getTiles();
    }
  }, [turn]);

  useEffect(() => {
    //fill racks at start of game (after pouch is ready)
    if (gameMode === "Computer") {
      if (
        pouch.length &&
        !playerRackTiles.length &&
        !computerRackTiles.length
      ) {
        const pouchCopy = [...pouch];
        const newTilesHuman = pouchCopy.slice(0, 7);
        const newTilesComputer = pouchCopy.slice(7, 14);
        pouchCopy.splice(0, 14);
        setPouch([...pouchCopy]);
        setPlayerRackTiles([...newTilesHuman]);
        setComputerRackTiles([...newTilesComputer]);
      }
    }
  }, [pouch]);

  useEffect(() => {
    //get tiles after user confirms tile exchange
    if (!boardIsDisabled && tilesToExchange.length > 0) {
      getTiles();
    }
  }, [boardIsDisabled]);

  useEffect(() => {
    //get board and set inital state
    if (gameMode === "Online") {
      setGameIsOver(gameData.gameState.isOver);
      setPlayerRackTiles(
        currentPlayer === 0
          ? gameData.gameState.player1Tiles
          : gameData.gameState.player2Tiles
      );
      setTimeLeftPlayer(
        currentPlayer === 0
          ? gameData.gameState.player1TimeLeft
          : gameData.gameState.player2TimeLeft
      );
      setTimeLeftOpponent(
        currentPlayer === 1
          ? gameData.gameState.player1TimeLeft
          : gameData.gameState.player2TimeLeft
      );
      setScores(gameData.gameState.scores);
      setBoardState(gameData.gameState.boardState);
      setTurn(gameData.gameState.turn);
      setConsecutivePasses(gameData.gameState.consecutivePasses);
      setPouch(gameData.gameState.pouch);
      setHighestScoringWord({ word: "", points: 0, player: null });
      setOutcome(null);
    }
    if (gameMode === "Computer") {
      fillPouch();
      setTurn(0);
    }

    if (gameData) {
      if (gameData.gameState.boardState.length === 0) {
        getBoard();
      }
    }
    if (gameMode === "Computer") {
      getBoard();
    }
  }, [gameMode]);

  //handle blank tile
  useEffect(() => {
    if (selectedTile) {
      const tile = selectedTile;
      tile.letter = blankTileLetter;
      tile.wasBlank = true;
      setSelectedTile(tile);
      placeTile2();
    }
  }, [blankTileLetter]);

  const getBoard = () => {
    const squares = generateBoardSquares(bonusSquareIndices);
    setBoardState([...squares]);
  };

  const getTiles = () => {
    if (gameMode === "Online" && turn !== currentPlayer) {
      const numTilesNeeded = 7 - playerRackTiles.length;
      if (numTilesNeeded <= 0) {
        return;
      }
      socket.emit("requestTiles", {
        gameId: gameData.gameId,
        numTilesNeeded: numTilesNeeded,
        player: currentPlayer,
      });
    }
    if (gameMode === "Computer") {
      let rackToUpdate;
      if (turn === 1) {
        rackToUpdate = playerRackTiles;
      } else {
        rackToUpdate = computerRackTiles;
      }
      const numTilesNeeded = 7 - rackToUpdate.length;
      if (!numTilesNeeded) {
        return;
      }
      const pouchCopy = [...pouch];
      pouchCopy.splice(0, numTilesNeeded);
      const newTiles = pouch.slice(0, numTilesNeeded);
      setPouch([...pouchCopy]);
      if (rackToUpdate === computerRackTiles) {
        setComputerRackTiles([...computerRackTiles, ...newTiles]);
      } else {
        setPlayerRackTiles([...playerRackTiles, ...newTiles]);
      }
    }
  };

  const nextPlayer = (
    x = 0,
    newScores = { 0: 0, 0: 0 },
    highestScoringWord = highestScoringWord
  ) => {
    if (gameMode === "Online") {
      socket.emit("updateGameState", {
        gameId: gameData.gameId,
        boardState: boardState,
        playerRackTiles: playerRackTiles,
        player: currentPlayer,
        scores: newScores,
        consecutivePasses: consecutivePasses + x,
        returnedTiles: tilesToExchange,
        currentPlayerTimeLeft: timeLeftPlayer,
        opponentTimeLeft: timeLeftOpponent,
        highestScoringWord: highestScoringWord,
      });
    }
    if (gameMode === "Computer") {
      if (!pouch.length && consecutivePasses > 1) {
        return;
      } else {
        setTurn(turn === 0 ? 1 : 0);
        setConsecutivePasses(consecutivePasses + x);
      }
    }
  };

  useEffect(() => {
    if (gameMode === "Online") {
      socket.on("sendingTiles", (data) => {
        setPlayerRackTiles([...playerRackTiles, ...data]);
        //here currentRackTiles are always 7
      });

      socket.on("gameEnd", (data) => {
        //redirect to players screen or show who won
        setOutcome(data.game.gameState.outcome);
        setEndedBy(data.gameEndedBy);
        exitGame();
      });

      //update global game data here for reloads
      socket.on("gameUpdated", (data) => {
        setGameIsOver(data.gameState.isOver);
        setBoardState(data.gameState.boardState);
        setTimeLeftPlayer(
          currentPlayer === 0
            ? gameData.gameState.player1TimeLeft
            : gameData.gameState.player2TimeLeft
        );
        setTimeLeftOpponent(
          currentPlayer === 1
            ? gameData.gameState.player1TimeLeft
            : gameData.gameState.player2TimeLeft
        );
        setScores(data.gameState.scores);
        setTurn(data.gameState.turn);
        setConsecutivePasses(data.gameState.consecutivePasses);
        setHighestScoringWord(data.gameState.highestScoringWord);
        setOutcome(data.gameState.outcome);
      });
    }
  }, [playerRackTiles]);

  const handleTimeOut = () => {
    setOutcome("TimeOut");
    gameOver("TimeOut");
  };

  const handleTimeWarning = () => {
    setTimeWarning(true);
  };

  useEffect(() => {
    if (placedTiles.length > 0) {
      getWordsOnBoard();
    }
  }, [placedTiles]);

  const getWordsOnBoard = () => {
    const words = findWordsOnBoard(boardState, placedTiles);
    setWordsOnBoard(words);
  };

  const gameOver = (outcome) => {
    if (gameMode === "Online") {
      socket.emit("gameOver", gameData.gameId, outcome, currentPlayer);
    }
    if (gameMode === "Computer") {
      setGameIsOver(true);
      exitGame();
    }
  };

  //______________________________________________________________________________

  //COMPUTER MODE FUNCTIONS
  //______________________________________________________________________________
  const computerMove = () => {
    axios
      .post("http://localhost:4001/computerMove/", {
        rackTiles: computerRackTiles,
        boardState,
        computerConsecutivePasses,
        lang,
        level,
      })
      .then((res) => {
        setTimeout(() => {
          if (res.data.exchange && pouch.length > 0) {
            setComputerConsecutivePasses(0);
            setNotification("SkrablBot has exchanged his tiles.");
            const computerRackTilesCopy = [...computerRackTiles];
            setPouch([...pouch, ...computerRackTilesCopy]);
            setComputerRackTiles([]);
            //computer rack tiles might not be updated by the time getTiles is called
            nextPlayer(0, scores, highestScoringWord);
          } else if (res.data.pass || (res.data.exchange && !pouch.length)) {
            setComputerConsecutivePasses(computerConsecutivePasses + 1);
            setNotification("SkrablBot has decided to pass.");
            nextPlayer(1, scores, highestScoringWord);
          } else {
            setComputerConsecutivePasses(0);
            const newWords = findWordsOnBoard(
              res.data.newBoardState,
              res.data.tilesUsed
            ).filter((word) => word.newWord === true);
            const [turnPoints, turnHighScore] = getTurnPoints(
              newWords,
              res.data.tilesUsed,
              turn
            );
            if (turnHighScore.points > highestScoringWord.points) {
              setHighestScoringWord(turnHighScore);
            }
            const playerPreviousPoints = scores[turn];
            const updatedScores = {
              ...scores,
              [turn]: playerPreviousPoints + turnPoints,
            };
            setBoardState(res.data.newBoardState);
            setComputerRackTiles(res.data.newRackTiles);
            setScores(updatedScores);
            nextPlayer(
              consecutivePasses * -1,
              updatedScores,
              highestScoringWord
            );
          }
        }, Math.floor(Math.random() * 6000 + 3000));
      });
  };

  useEffect(() => {
    //called here to make sure pouch and player rack have finished updating first
    if (gameMode === "Computer" && turn === 1) {
      computerMove();
    }
  }, [playerRackTiles]);

  useEffect(() => {
    //if human passes or exchanges tiles, the above useEffect won't work so just call computerMove when turn changes
    if (gameMode === "Computer" && turn === 1 && playerRackTiles.length === 7) {
      computerMove();
    }
  }, [turn]);

  //______________________________________________________________________________

  //GAME PLAY BY USER
  //______________________________________________________________________________
  useEffect(() => {
    placeTile();
  }, [selectedSquareIndex]);

  //consecutive passes
  useEffect(() => {
    if (
      consecutivePasses > 5 ||
      (consecutivePasses > 1 && pouch.length === 0)
    ) {
      // game ends if players pass six turns in a row, or pass twice when there are no tiles left in pouch
      // end game
      gameOver();
    }
  }, [consecutivePasses]);

  //the placed tile is sent to check for blank tiles
  const placeTile = () => {
    if (selectedSquareIndex !== null) {
      const squareIsOccupied = squaresAreOccupied(
        [selectedSquareIndex],
        boardState
      );
      if (squareIsOccupied) {
        return;
      }
      playSound(placeTileSound);
      if (selectedTile.letter === "") {
        setConfirmMessage({
          type: "blankTile",
          message: "What letter would you like to assign to the blank tile?",
        });
        return;
      } else {
        const tile = selectedTile;
        tile.wasBlank = false;
        setSelectedTile(tile);
        placeTile2();
      }
    }
  };

  //placetile's second part. after values are assigned to blank tiles
  const placeTile2 = () => {
    const tileToAdd = {
      ...selectedTile,
      square: selectedSquareIndex,
      player: 0,
    };
    const updatedBoardState = boardState.map((square) => {
      if (square.index === selectedSquareIndex) {
        return { ...square, tile: tileToAdd };
      } else {
        return square;
      }
    });
    setBoardState(updatedBoardState);
    setPlacedTiles([
      ...placedTiles,
      { ...selectedTile, square: selectedSquareIndex },
    ]);
    setPlayerRackTiles([
      ...playerRackTiles.filter((tile) => tile.id !== selectedTile.id),
    ]);
    setSelectedTile(null);
    setSelectedSquareIndex(null);
  };

  //user clicks
  const handleClickSquare = (square) => {
    if (currentPlayer !== turn) {
      return;
    }
    if (selectedTile) {
      setSelectedSquareIndex(square.index);
    }
  };

  //user wnats to remove a placed tile
  const handleClickPlacedTile = (tileToRemove) => {
    if (
      selectedTile === 0 ||
      currentPlayer !== turn ||
      placedTiles.filter((tile) => tile.square == tileToRemove.square)
        .length === 0
    )
      return;
    if (tileToRemove.player === 0) {
      playSound(removeTileSound);
      const updatedBoardState = boardState.map((square) => {
        if (square.tile && square.tile.square === tileToRemove.square) {
          return { ...square, tile: null };
        } else {
          return square;
        }
      });
      setBoardState(updatedBoardState);
      setPlacedTiles(
        placedTiles.filter((tile) => tile.square !== tileToRemove.square)
      );
      if (tileToRemove.wasBlank) tileToRemove.letter = "";
      setPlayerRackTiles([...playerRackTiles, tileToRemove]);
    }
  };

  //user wants to pass
  const handleClickPass = () => {
    if (currentPlayer !== turn) return;
    if (consecutivePasses === 5) {
      setConfirmMessage({
        type: "pass",
        message:
          notifications[
            "This will be the sixth consecutive pass, and will end the game!  Are you sure you want to pass?"
          ][lang],
      });
    } else {
      setConfirmMessage({
        type: "pass",
        message: notifications["Are you sure you want to pass?"][lang],
      });
    }
  };

  const handleClickResign = () => {
    setConfirmMessage({
      type: "resign",
      message: notifications["Are you sure you want to resign?"][lang],
    });
  };

  const handleClickShuffle = () => {
    playSound(shuffleSound);
    const shuffled = shuffle([...playerRackTiles]);
    setPlayerRackTiles([...shuffled]);
  };

  const handleClickTile = (tile) => {
    if (currentPlayer !== turn) return;
    if (boardIsDisabled) {
      if (
        [...tilesToExchange].filter((item) => item.id === tile.id).length === 0
      ) {
        setTilesToExchange([...tilesToExchange, tile]);
      } else {
        setTilesToExchange(
          [...tilesToExchange].filter((item) => item.id !== tile.id)
        );
      }
    } else {
      setSelectedTile(tile);
    }
  };

  const handleClickExchangeTiles = () => {
    if (currentPlayer === turn) {
      setBoardIsDisabled(!boardIsDisabled);
    }
  };

  const handleCancelExchange = () => {
    setTilesToExchange([]);
    setBoardIsDisabled(!boardIsDisabled);
  };

  const handleConfirmExchange = () => {
    const idsToRemove = tilesToExchange.map((tile) => tile.id);
    const updatedRack = playerRackTiles.filter(
      (tile) => !idsToRemove.includes(tile.id)
    );
    setPlayerRackTiles(updatedRack);
    setBoardIsDisabled(false);
    //in online mode, tiles will be returned at end of turn
    if (gameMode === "Computer") {
      setPouch([...pouch, ...tilesToExchange]);
    }
    nextPlayer(consecutivePasses * -1, scores, highestScoringWord);
  };

  const handleClickClearTiles = () => {
    if (currentPlayer !== turn) return;
    setPlayerRackTiles([...playerRackTiles, ...placedTiles]);
    const placedTilesSquares = placedTiles.map((tile) => tile.square);
    const updatedBoardState = [
      ...boardState.map((square) => {
        if (placedTilesSquares.includes(square.index)) {
          return { ...square, tile: null };
        } else {
          return square;
        }
      }),
    ];
    setBoardState([...updatedBoardState]);
    setPlacedTiles([]);
  };

  const handleClickConfirmMove = () => {
    if (currentPlayer !== turn) return;
    if (moveIsValid(placedTiles, boardState)) {
      var newWords = wordsOnBoard.filter((word) => word.newWord === true);
      setTurnWords(newWords);
      handleBlankTiles(newWords, setConfirmMessage);
      axios
        .post("http://localhost:4001/verifyWord", {
          words: newWords,
          lang,
        })
        .then((res) => {
          const results = res.data;
          if (Object.values(results).every((val) => val === "true")) {
            const [turnPoints, turnHighScore] = getTurnPoints(
              newWords,
              placedTiles,
              turn
            );
            const playerPreviousPoints = scores[turn];
            const updatedScores = {
              ...scores,
              [turn]: playerPreviousPoints + turnPoints,
            };
            playSound(correctSound);
            setScores(updatedScores);
            if (turnHighScore.points > highestScoringWord.points) {
              setHighestScoringWord(turnHighScore);
              nextPlayer(consecutivePasses * -1, updatedScores, turnHighScore);
            } else
              nextPlayer(
                consecutivePasses * -1,
                updatedScores,
                highestScoringWord
              );
            setPlacedTiles([]);
            return;
          } else {
            const checkedWords = Object.keys(results);
            const invalidWords = [];
            checkedWords.forEach((word) => {
              if (results[word] === "false") {
                invalidWords.push(word);
              } else {
                return;
              }
            });
            //just showing first for simplicity
            playSound(invalidSound);
            setNotification(
              `${notifications["The following word was not found in the dictionary:"][lang]} ${invalidWords[0]}`
            );
          }
        });
      return;
    } else {
      playSound(invalidSound);
      const placedTilesIndices = placedTiles.map((tile) => tile.square);
      if (
        scores[0] === 0 &&
        scores[1] === 0 &&
        placedTilesIndices.indexOf(112) === -1
      ) {
        setNotification(
          notifications[
            "The first word on the board must use the centre square."
          ][lang]
        );
        return;
      } else {
        setNotification(notifications["The move is not valid."][lang]);
        return;
      }
    }
  };

  //______________________________________________________________________________

  //MODAL CONFRIMATION FUNCTIONS
  //______________________________________________________________________________

  const handleResign = () => {
    closeModal();
    setOutcome("Resign");
    gameOver("Resign");
  };

  const handlePass = () => {
    closeModal();
    nextPlayer(1, scores, highestScoringWord);
    setConsecutivePasses(consecutivePasses + 1);
  };

  const closeModal = () => {
    setConfirmMessage(null);
  };

  //______________________________________________________________________________

  //OTHER FUNCTIONS
  //______________________________________________________________________________

  const playSound = (audioFile) => {
    if (!mute) {
      const audio = new Audio(audioFile);
      audio.play();
    }
  };

  const exitGame = () => {
    setGameIsOver(true);
  };

  const returnToHomeScreen = () => {
    if (gameMode === "Online") {
      resetChatMsg();
      setCurrentComponent("Login");
      setInvitedPlayer(null);
      setGameData("null");
      setInviteSent(false);
      setGameId("");
    } else {
      setCurrentComponent("GameModeScreen");
      setGameMode(null);
    }
  };

  //______________________________________________________________________________

  const handleDragStart = (e) => {
    e.persist();
    setDragTileId(JSON.parse(e.target.id));
    if (e.target.dataset.origin === "board") {
      setDragOriginIndex(JSON.parse(e.target.parentNode.id));
    }
    setTimeout(() => {
      e.target.style.display = "none";
    }, 0);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    //if moving to rack
    e.persist();
    e.stopPropagation();
    //sometimes the target is a nested child element e.g. tile__letter so the tile just disappears
    if (
      e.target.classList.contains("tileRack__wrapper") ||
      e.target.classList.contains("tileRack__tile")
    ) {
      const movingTile = placedTiles.filter(
        (tile) => tile.id === dragTileId
      )[0];
      movingTile.square = null;
      const updatedPlacedTiles = placedTiles.filter(
        (tile) => tile.id !== dragTileId
      );
      const updatedBoardState = boardState.map((square) => {
        if (square.index === dragOriginIndex) {
          return { ...square, tile: null };
        } else return square;
      });
      setBoardState(updatedBoardState);
      setPlacedTiles(updatedPlacedTiles);
      //need to get index to insert tile
      const updatedPlayerRackTiles = [...playerRackTiles, movingTile];
      setPlayerRackTiles(updatedPlayerRackTiles);
    } else {
      //if moving to board
      const targetId = JSON.parse(e.target.id);
      let movingTile;
      //if coming from another square
      if (dragOriginIndex !== null) {
        movingTile = placedTiles.filter((tile) => tile.id === dragTileId)[0];
      } else {
        //if coming from rack
        movingTile = playerRackTiles.filter(
          (tile) => tile.id === dragTileId
        )[0];
      }
      movingTile.square = targetId;
      const updatedBoardState = boardState
        .map((square) => {
          if (square.index === dragOriginIndex) {
            return { ...square, tile: null };
          } else return square;
        })
        .map((square) => {
          if (square.index === targetId) {
            return { ...square, tile: movingTile };
          } else {
            return square;
          }
        });
      const updatedPlacedTiles = [...placedTiles, movingTile];
      setBoardState(updatedBoardState);
      setPlacedTiles(updatedPlacedTiles);
    }
    setDragOriginIndex(null);
    setDragTileId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Fade className="container__full-height" triggerOnce>
      <div className="gameScreen__wrapper">
        {viewChat && (
          <ChatModal
            currentPlayer={currentPlayer}
            closeModal={handleClickChat}
            chatThread={chatThread}
            handleSendMessage={handleSendMessage}
            lang={lang}
          />
        )}
        <div
          className={
            gameMode === "Computer"
              ? "gameScreen__main"
              : "gameScreen__main gameScreen__chat"
          }
        >
          <div className="gameScreen__board" onDragStart={handleDragStart}>
            <Board
              handleClickSquare={handleClickSquare}
              handleClickPlacedTile={handleClickPlacedTile}
              boardState={boardState}
              isDisabled={boardIsDisabled}
              lang={lang}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
            />
            <TileRack
              selectedTile={selectedTile}
              tilesToExchange={tilesToExchange}
              playerRackTiles={playerRackTiles}
              handleClickTile={handleClickTile}
              lang={lang}
              turn={turn}
              boardIsDisabled={boardIsDisabled}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
            />
          </div>
          <StatusBar
            highestScoringWord={highestScoringWord}
            computerRackTiles={computerRackTiles}
            pouch={pouch}
            scores={scores}
            user={user}
            invitedPlayer={invitedPlayer}
            setNotification={setNotification}
            timeLeftPlayer={timeLeftPlayer}
            timeLeftOpponent={timeLeftOpponent}
            setTimeLeftPlayer={setTimeLeftPlayer}
            setTimeLeftOpponent={setTimeLeftOpponent}
            currentPlayer={currentPlayer}
            turn={turn}
            gameMode={gameMode}
            handleTimeOut={handleTimeOut}
            timeWarning={timeWarning}
            handleTimeWarning={handleTimeWarning}
            lang={lang}
          />
          {!boardIsDisabled && (
            <GameButtons
              placedTiles={placedTiles}
              handleClickClearTiles={handleClickClearTiles}
              handleClickShuffle={handleClickShuffle}
              handleClickConfirmMove={handleClickConfirmMove}
              handleClickResign={handleClickResign}
              handleClickPass={handleClickPass}
              handleClickExchangeTiles={handleClickExchangeTiles}
              lang={lang}
            />
          )}
          {boardIsDisabled && (
            <ExchangeTilesButtons
              handleCancelExchange={handleCancelExchange}
              handleConfirmExchange={handleConfirmExchange}
              lang={lang}
            />
          )}
          {gameMode === "Online" && (
            <Chat
              chatThread={chatThread}
              setChatThread={setChatThread}
              gameId={gameData.gameId}
              currentPlayer={currentPlayer}
              socket={socket}
              handleSendMessage={handleSendMessage}
              lang={lang}
            />
          )}
        </div>

        {gameIsOver && (
          <GameOverModal
            user={user}
            invitedPlayer={invitedPlayer}
            currentPlayer={currentPlayer}
            scores={scores}
            outcome={outcome}
            endedBy={endedBy}
            highestScoringWord={highestScoringWord}
            gameMode={gameMode}
            socket={socket}
            returnToHomeScreen={returnToHomeScreen}
            lang={lang}
          />
        )}
        {confirmMessage && (
          <ConfirmModal
            message={confirmMessage}
            handleResign={handleResign}
            handlePass={handlePass}
            closeModal={closeModal}
            turnWords={turnWords}
            setTurnWords={setTurnWords}
            setBlankTileLetter={setBlankTileLetter}
            lang={lang}
          />
        )}
      </div>
    </Fade>
  );
};

export default GameScreen;
