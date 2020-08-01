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
  const [timeLeftPlayer, setTimeLeftPlayer] = useState(null);
  const [timeLeftOpponent, setTimeLeftOpponent] = useState(null);
  const [scores, setScores] = useState(null);
  const [highestScoringWord, setHighestScoringWord] = useState({
    word: "",
    points: 0,
  });
  const [turn, setTurn] = useState(null);
  const [tilesToExchange, setTilesToExchange] = useState([]);
  const [boardIsDisabled, setBoardIsDisabled] = useState(false);
  const [consecutivePasses, setConsecutivePasses] = useState(0);
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
  const [chatThread, setChatThread] = useState([
    {
      playerFromBackend: 0,
      playerName: "SkrablBot",
      msg: "Welcome, you are now connected",
      date: now.format("h:mm:ss a"),
    },
  ]);

  const getComputerTiles = () => {
    const numTilesNeeded = 7 - computerRackTiles.length;
    const pouchCopy = [...pouch];
    pouchCopy.splice(0, numTilesNeeded);
    const newTiles = pouch.slice(0, numTilesNeeded);
    setPouch([...pouchCopy]);
    setComputerRackTiles([...computerRackTiles, ...newTiles]);
  };

  useEffect(() => {
    if (gameMode === "Online") {
      if (turn === 1) {
        getTiles();
      }
    }
    if (gameMode === "Computer" && pouch.length > 0) {
      if (turn === 1) {
        getTiles();
      }
    }
  }, [turn, gameMode]);

  useEffect(() => {
    //need to get tiles at start after pouch is ready
    //not sure best way to check that it's the start of the game
    //this solution is not ideal as each lang has diff num tiles
    if (gameMode === "Computer") {
      if (lang === "en" || lang === "tr") {
        if (turn === 0 && pouch.length === 100) {
          getTiles();
        }
      }
      if (lang === "fr") {
        if (turn === 0 && pouch.length === 102) {
          getTiles();
        }
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
    if (gameMode === "Computer" && turn === 1) {
      computerMove();
    }
  }, [computerRackTiles]);

  const computerMove = () => {
    axios
      .post("http://localhost:4001/computerMove/", {
        rackTiles: computerRackTiles,
        boardState,
        lang,
        level,
      })
      .then((res) => {
        if (res.data.pass) {
          setNotification("The computer has decided to pass.");
          nextPlayer();
        } else {
          const lettersUsed = res.data.word.split("");
          let tilesUsed = [];
          const updatedComputerRackTiles = computerRackTiles.filter((tile) => {
            if (lettersUsed.includes(tile.letter)) {
              tilesUsed.push(tile);
              const indexToRemove = lettersUsed.indexOf(tile.letter);
              lettersUsed.splice(indexToRemove, 1);
              return false;
            } else {
              return true;
            }
          });
          const returnedBoardState = JSON.parse(
            JSON.stringify(res.data.boardState)
          );
          const updatedSquaresIndices = res.data.updatedSquares;
          const lettersUsedAgain = res.data.word.split("");
          let tilesUsedCopy = [...tilesUsed];
          for (let i = 0; i < returnedBoardState.length; i++) {
            if (
              updatedSquaresIndices.includes(returnedBoardState[i].index) &&
              lettersUsedAgain.includes(returnedBoardState[i].tile.letter)
            ) {
              let replacementTile = tilesUsedCopy.filter(
                (tile) => tile.letter === returnedBoardState[i].tile.letter
              )[0];

              replacementTile = {
                ...replacementTile,
                player: 1,
                square: returnedBoardState[i].index,
              };
              returnedBoardState[i].tile = replacementTile;
              tilesUsedCopy = tilesUsedCopy.filter(
                (tile) => tile.id !== replacementTile.id
              );
            }
          }
          setTimeout(() => {
            const newWords = findWordsOnBoard(
              returnedBoardState,
              tilesUsed
            ).filter((word) => word.newWord === true);
            const [turnPoints, turnHighScore] = getTurnPoints(
              newWords,
              tilesUsed
            );
            if (turnHighScore.points > highestScoringWord.points) {
              setHighestScoringWord(turnHighScore);
            }
            const playerPreviousPoints = scores[turn];
            const updatedScores = {
              ...scores,
              [turn]: playerPreviousPoints + turnPoints,
            };
            setBoardState(returnedBoardState);
            setScores(updatedScores);
            nextPlayer(0, updatedScores, highestScoringWord);
            setComputerRackTiles(updatedComputerRackTiles);
          }, 5000);
        }
      });
  };

  //EFFECTS

  useEffect(() => {
    //set inital state
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
      setHighestScoringWord({word: '', points: 0});
    }
    if (gameMode === "Computer") {
      setGameIsOver(false);
      setPlayerRackTiles([]);
      setBoardState([]);
      setTimeLeftPlayer(20);
      setTimeLeftOpponent(20);
      setScores({ 0: 0, 1: 0 });
      setTurn(0);
      setConsecutivePasses(null);
      setHighestScoringWord({word: '', points: 0});
    }
  }, [gameMode]);

  useEffect(() => {
    if (gameMode === "Computer") {
      fillPouch();
    }
    getBoard();
  }, []);

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
    console.log("highestScoringWord:");
    console.log(highestScoringWord);
  }, [highestScoringWord]);

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
        console.log('300 GS');
        console.log(data.gameState.highestScoringWord);
        setHighestScoringWord(data.gameState.highestScoringWord);
      });
      console.log("from retrived")
      console.log(timeLeftPlayer)
      console.log(timeLeftOpponent)
    }
    if (gameMode === "Computer") {
      if (turn === 1) {
        getComputerTiles();
      }
    }
  }, [playerRackTiles, confirmMessage]);

  const getBoard = () => {
    const squares = generateBoardSquares(bonusSquareIndices);
    setBoardState([...squares]);
  };

  const getTiles = () => {
    const numTilesNeeded = 7 - playerRackTiles.length;
    if (numTilesNeeded <= 0) {
      return;
    }
    if (gameMode === "Online") {
      socket.emit("requestTiles", {
        gameId: gameData.gameId,
        numTilesNeeded: numTilesNeeded,
        player: currentPlayer,
      });
    }
    if (gameMode === "Computer") {
      const pouchCopy = [...pouch];
      pouchCopy.splice(0, numTilesNeeded);
      const newTiles = pouch.slice(0, numTilesNeeded);
      setPouch([...pouchCopy]);
      setPlayerRackTiles([...playerRackTiles, ...newTiles]);
    }
  };

<<<<<<< HEAD
  const nextPlayer = (x = 0, newScores = { 0: 0, 0: 0 }, highestScoringWord = highestScoringWord) => {
=======
  const nextPlayer = (x = 0, newScores = { 0: 0, 0: 0 }) => {
    console.log("player time: " + timeLeftPlayer)
    console.log("opponent time " +timeLeftOpponent)
>>>>>>> 7df309cdb58249703664e473f2ede12db483ed13
    if (gameMode === "Online") {
      console.log('340 NxtPlyr');
      console.log(highestScoringWord);
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
    gameOver();
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
    nextPlayer(0, scores);
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
      const newWords = findWordsOnBoard(boardState, placedTiles).filter(
        (word) => word.newWord === true
      );
      axios
        .post("http://localhost:4001/verifyWord", {
          words: newWords,
          lang,
        })
        .then((res) => {
          const results = res.data;
          console.log('res.data');
          console.log(res.data, lang);
          if (Object.values(results).every((val) => val === "true")) {
            const [turnPoints, turnHighScore] = getTurnPoints(
              newWords,
              placedTiles
            );
            if (turnHighScore.points > highestScoringWord.points) {
              setHighestScoringWord(turnHighScore);
            }

            const playerPreviousPoints = scores[turn];
            const updatedScores = {
              ...scores,
              [turn]: playerPreviousPoints + turnPoints,
            };
           
            setScores(updatedScores);
            nextPlayer(consecutivePasses * -1, updatedScores, turnHighScore);   
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

  const gameOver = () => {
    if (gameMode === "Online") {
      setGameIsOver(true);
      socket.emit("gameOver", gameData.gameId);
    }
    if (gameMode === "Computer") {
      setGameIsOver(true);
    }
  };

  const exitGame = () => {
    if (gameMode === "Online") {
      setCurrentComponent("Players");
    }
    if (gameMode === "Computer") {
      setGameMode(null);
      setCurrentComponent("WelcomeScreen");
    }
  };

  const closeModal = () => {
    setConfirmMessage(null);
  };

  return (
    <Fade className="container__full-height" triggerOnce>
      <div className="gameScreen__wrapper">
        {viewChat && (
          <ChatModal
            gameId={gameData.gameId}
            currentPlayer={currentPlayer}
            socket={socket}
            closeModal={handleClickChat}
            chatThread={chatThread}
            setChatThread={setChatThread}
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
            />
          )}
        </div>

        {gameIsOver && (
          <GameOverModal
            user={user}
            invitedPlayer={invitedPlayer}
            currentPlayer={currentPlayer}
            scores={scores}
            highestScoringWord={highestScoringWord}
            gameMode={gameMode}
            // scoredWords={scoredWords}
            exitGame={exitGame}
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
