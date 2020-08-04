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
import { bonusSquareIndices } from "../assets/bonusSquareIndices";
import { Fade } from "react-awesome-reveal";
import axios from "axios";
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
  });
  const [turn, setTurn] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [tilesToExchange, setTilesToExchange] = useState([]);
  const [boardIsDisabled, setBoardIsDisabled] = useState(false);
  const [consecutivePasses, setConsecutivePasses] = useState(0);
  const [computerConsecutivePasses, setComputerConsecutivePasses] = useState(0);
  const [pouch, setPouch] = useState([]);
  const [computerRackTiles, setComputerRackTiles] = useState([]);
  const [newMessage, setNewMessage] = useState();
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
      msg: "Welcome, you are now connected",
      date: now.format("h:mm:ss a"),
    },
  ]);

  useEffect(() => {
    if (gameMode === "Online") {
      socket.on("recieveMsg", (data) => {
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

  useEffect(() => {
    if (gameMode === "Online") {
      if (turn === 1) {
        getTiles();
      }
    }
    if (gameMode === "Computer") {
      getTiles();
    }
  }, [turn]);

  useEffect(() => {
    //fill racks at start of game (after pouch is ready)
    if (pouch.length && !playerRackTiles.length && !computerRackTiles.length) {
      const pouchCopy = [...pouch];
      const newTilesHuman = pouchCopy.slice(0, 7);
      const newTilesComputer = pouchCopy.slice(7, 14);
      pouchCopy.splice(0, 14);
      setPouch([...pouchCopy]);
      setPlayerRackTiles([...newTilesHuman]);
      setComputerRackTiles([...newTilesComputer]);
    }
  }, [pouch]);

  useEffect(() => {
    //get tiles after user confirms tile exchange
    if (!boardIsDisabled && tilesToExchange.length > 0) {
      getTiles();
    }
  }, [boardIsDisabled]);

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
        if (res.data.exchange && pouch.length > 0) {
          setComputerConsecutivePasses(0);
          setNotification("SkrablBot has exchanged his tiles.");
          const computerRackTilesCopy = [...computerRackTiles];
          setPouch([...pouch, ...computerRackTilesCopy]);
          setComputerRackTiles([]);
          //computer rack tiles might not be updated by the time getTiles is called
          nextPlayer();
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
            res.data.tilesUsed
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
          nextPlayer(0, updatedScores, highestScoringWord);
        }
      });
  };

  //EFFECTS

  useEffect(() => {
    //get board and set inital state
    if (gameMode === "Online") {
      setGameIsOver(gameData.gameState.isOver);
      setPlayerRackTiles(
        currentPlayer === 0
          ? gameData.gameState.player1Tiles
          : gameData.gameState.player2Tiles
      );
      setBoardState(gameData.gameState.boardState);
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
      setTurn(gameData.gameState.turn);
      setConsecutivePasses(gameData.gameState.consecutivePasses);
      setPouch(gameData.gameState.pouch);
      setHighestScoringWord({ word: "", points: 0 });
      setOutcome(null);
    }
    if (gameMode === "Computer") {
      fillPouch();
      setTurn(0);
    }
    getBoard();
  }, [gameMode]);

  useEffect(() => {
    placeTile();
  }, [selectedSquareIndex]);

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

  useEffect(() => {
    if (gameMode === "Online") {
      socket.on("sendingTiles", (data) => {
        setPlayerRackTiles([...playerRackTiles, ...data]);
        //here currentRackTiles are always 7
      });

      socket.on("gameEnd", (data) => {
        //redirect to players screen or show who won
        exitGame();
      });

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
  }, []);

  const getBoard = () => {
    const squares = generateBoardSquares(bonusSquareIndices);
    setBoardState([...squares]);
  };

  const getTiles = () => {
    if (gameMode === "Online") {
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

  const nextPlayer = (x = 0, newScores = { 0: 0, 0: 0 }) => {
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
      setTurn(turn === 0 ? 1 : 0);
      setConsecutivePasses(consecutivePasses + x);
    }
  };

  const placeTile = () => {
    if (selectedSquareIndex !== null) {
      const squareIsOccupied = squaresAreOccupied(
        [selectedSquareIndex],
        boardState
      );
      if (squareIsOccupied) {
        return;
      }
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
    }
  };

  //EVENT HANDLERS

  const handleClickSquare = (square) => {
    if (currentPlayer !== turn) {
      return;
    }
    if (selectedTile) {
      setSelectedSquareIndex(square.index);
    }
  };

  const handleClickPlacedTile = (tileToRemove) => {
    if (
      selectedTile === 0 ||
      currentPlayer !== turn ||
      placedTiles.filter((tile) => tile.square == tileToRemove.square)
        .length === 0
    )
      return;

    if (tileToRemove.player === 0) {
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
      setPlayerRackTiles([...playerRackTiles, tileToRemove]);
    }
  };

  const handleClickPass = () => {
    if (currentPlayer !== turn) return;
    if (consecutivePasses === 5) {
      setConfirmMessage({
        type: "pass",
        message:
          "This will be the sixth consecutive pass, and will end the game!  Are you sure you want to pass?",
      });
    } else {
      setConfirmMessage({
        type: "pass",
        message: "Are you sure you want to pass?",
      });
    }
  };

  const handleClickResign = () => {
    setConfirmMessage({
      type: "resign",
      message: "Are you sure you want to resign?",
    });
  };

  const handleConfirmMove = () => {
    if (currentPlayer !== turn) return;
    setConfirmMessage({
      type: "confirm",
      message: "Confirm move end?",
    });
  };

  const handleClickShuffle = () => {
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

  const handleResign = () => {
    closeModal();
    setOutcome('Resign');
    gameOver('Resign');
  };

  const handlePass = () => {
    closeModal();
    nextPlayer(1, scores, highestScoringWord);
    setConsecutivePasses(consecutivePasses + 1);
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
    nextPlayer(0, scores, highestScoringWord);
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

  useEffect(() => {
    if (placedTiles.length > 0) {
      getWordsOnBoard();
    }
  }, [placedTiles]);

  const getWordsOnBoard = () => {
    const words = findWordsOnBoard(boardState, placedTiles);
    setWordsOnBoard(words);
  };

  const handleClickConfirmMove = () => {
    if (currentPlayer !== turn) return;
    if (moveIsValid(placedTiles, boardState)) {
      var newWords = wordsOnBoard.filter((word) => word.newWord === true);
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
              placedTiles
            );
            const playerPreviousPoints = scores[turn];
            const updatedScores = {
              ...scores,
              [turn]: playerPreviousPoints + turnPoints,
            };
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
            setNotification("Don't make up words!");
            return;
          }
        });
      return;
    } else {
      setNotification("move is not valid");
      return;
    }
  };

  //OTHER

  const gameOver = (outcome) => {
    if (gameMode === "Online") {
      socket.emit("gameOver", gameData.gameId, outcome);
    }
    if (gameMode === "Computer") {
      setGameIsOver(true);
    }
  };

  const exitGame = () => {
    if (gameMode === "Online") {
      setGameIsOver(true);
    }
    if (gameMode === "Computer") {
      setGameMode(null);
      setCurrentComponent("WelcomeScreen");
    }
  };

  const returnToHomeScreen = () => {
    if (gameMode === "Online") {
      resetChatMsg();
      setCurrentComponent("Players");
    } else setCurrentComponent("WelcomeScreen");
  };

  const closeModal = () => {
    setConfirmMessage(null);
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
          />
        )}
        <div className="gameScreen__main">
          <div className="gameScreen__board">
            <Board
              handleClickSquare={handleClickSquare}
              handleClickPlacedTile={handleClickPlacedTile}
              boardState={boardState}
              isDisabled={boardIsDisabled}
              lang={lang}
            />
            <TileRack
              selectedTile={selectedTile}
              tilesToExchange={tilesToExchange}
              playerRackTiles={playerRackTiles}
              handleClickTile={handleClickTile}
              lang={lang}
              turn={turn}
              boardIsDisabled={boardIsDisabled}
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
            />
          )}
          {boardIsDisabled && (
            <ExchangeTilesButtons
              handleCancelExchange={handleCancelExchange}
              handleConfirmExchange={handleConfirmExchange}
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
            highestScoringWord={highestScoringWord}
            gameMode={gameMode}
            // scoredWords={scoredWords}
            socket={socket}
            returnToHomeScreen={returnToHomeScreen}
          />
        )}
        {confirmMessage && (
          <ConfirmModal
            message={confirmMessage}
            handleResign={handleResign}
            handlePass={handlePass}
            handleConfirmMove={handleConfirmMove}
            closeModal={closeModal}
          />
        )}
      </div>
    </Fade>
  );
};

export default GameScreen;
