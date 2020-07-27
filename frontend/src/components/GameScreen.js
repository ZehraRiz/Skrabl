import React, { useState, useEffect } from "react";
import Board from "../components/Board";
import TileRack from "./TileRack";
import StatusBar from "./StatusBar";
import Chat from "./Chat";
import GameButtons from "./GameButtons";
import ExchangeTilesButtons from "./ExchangeTilesButtons";
import ConfirmModal from "./ConfirmModal";
import GameOverModal from "./GameOverModal";
import { generateBoardSquares } from "../utils/generateBoardSquares";
import { shuffle } from "../utils/shuffle";
import { moveIsValid } from "../utils/moveIsValid";
import { squaresAreOccupied } from "../utils/squaresAreOccupied";
import { findWordsOnBoard } from "../utils/findWordsOnBoard";
import { getScoresFromWords } from "../utils/getScoresFromWords";
import { bonusSquareIndices } from "../assets/bonusSquareIndices";
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
  const [scoredWords, setScoredWords] = useState({ 0: [], 1: [] });
  const [scores, setScores] = useState(null);
  const [turn, setTurn] = useState(null);
  const [tilesToExchange, setTilesToExchange] = useState([]);
  const [boardIsDisabled, setBoardIsDisabled] = useState(false);
  const [wordsOnBoard, setWordsOnBoard] = useState([]);
  const [consecutivePasses, setConsecutivePasses] = useState(0);
  const [pouch, setPouch] = useState([]);
  const [computerRackTiles, setComputerRackTiles] = useState([]);
  const fillPouch = async () => {
    const res = await axios.get("http://localhost:4001/getPouch");
    setPouch(res.data);
  };

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
        getComputerTiles();
      }
      if (turn === 0) {
        getTiles();
      }
    }
  }, [turn, gameMode]);

  useEffect(() => {
    if (gameMode === "Computer" && turn === 0 && pouch.length === 100) {
      getTiles();
    }
  }, [pouch]);

  useEffect(() => {
    if (gameMode === "Computer" && turn === 1) {
      setTimeout(() => {
        computerMove();
      }, 5000);
    }
  }, [computerRackTiles]);

  const computerMove = () => {
    axios
      .post("http://localhost:4001/computerMove/", {
        rackLetters: computerRackTiles,
        boardState,
      })
      .then((res) => {
        if (res.data.pass) {
          setNotification("The computer has decided to pass.");
        } else {
          const lettersUsed = [...res.data.lettersUsed];
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
          const updatedSquaresIndices = res.data.updatedSquaresIndices;
          const lettersUsedAgain = [...res.data.lettersUsed];
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
          const allWords = findWordsOnBoard(returnedBoardState, tilesUsed);
          setWordsOnBoard(allWords);
          var newWords = allWords.filter((word) => word.newWord === true);
          var newScores = scores;
          newWords.forEach((word) => {
            newScores[1] = newScores[1] + word.wordScore;
          });
          setBoardState(returnedBoardState);
          nextPlayer();
          //in this order so doesn't call backend twice
          setScores(newScores);
          setComputerRackTiles(updatedComputerRackTiles);
        }
        nextPlayer();
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
    }
    if (gameMode === "Computer") {
      setGameIsOver(false);
      setPlayerRackTiles([]);
      setBoardState([]);
      setTimeLeftPlayer(null);
      setTimeLeftOpponent(null);
      setScores({ 0: 0, 1: 0 });
      setTurn(0);
      setConsecutivePasses(null);
    }
  }, [gameMode]);

  useEffect(() => {
    if (gameMode === "Computer") {
      fillPouch();
    }
    getBoard();
  }, []);

  useEffect(() => {
    if (scoredWords[0].length > 0 && scoredWords[1].length > 0) {
      updateScores();
    }
  }, [scoredWords]);

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
      console.log("END GAME");
    }
  }, [consecutivePasses]);

  useEffect(() => {
    if (gameMode === "Online") {
      socket.on("sendingTiles", (data) => {
        setPlayerRackTiles([...playerRackTiles, ...data]);
        //here currentRackTiles are always 7
      });

      socket.on("gameEnd", (data) => {
        console.log(data);
        //redirect to players screen or show who won
        console.log("the game has ended");
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
      });
    }
  }, [playerRackTiles]);

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
      setPlayerRackTiles([...playerRackTiles, ...newTiles]);
      setPouch([...pouchCopy]);
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
      });
    }
    if (gameMode === "Computer") {
      setTurn(turn === 0 ? 1 : 0);
    }
  };

  const updateScores = () => {
    const updatedScores = getScoresFromWords(scoredWords);
    setScores(updatedScores);
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
    if (selectedTile === 0 || currentPlayer !== turn) return;
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
    setConfirmMessage({
      type: "pass",
      message: "Are you sure you want to pass?",
    });
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
    } else setSelectedTile(tile);
  };

  const handleResign = () => {
    closeModal();
    gameOver();
  };

  const handlePass = () => {
    closeModal();
    nextPlayer(1);
  };

  const handleClickExchangeTiles = () => {
    setBoardIsDisabled(!boardIsDisabled);
  };

  const handleCancelExchange = () => {
    setTilesToExchange([]);
    setBoardIsDisabled(!boardIsDisabled);
  };

  const handleConfirmExchange = () => {
    // send tilesToExchange to backend, return new tiles
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
      const allWords = findWordsOnBoard(boardState, placedTiles);
      setWordsOnBoard(allWords);
      var newWords = allWords.filter((word) => word.newWord === true);
      axios
        .post("http://localhost:4001/verifyWord", { words: newWords })
        .then((res) => {
          const results = res.data;
          if (Object.values(results).every((val) => val === "true")) {
            var newScores = scores;
            newWords.forEach((word) => {
              newScores[turn] = newScores[turn] + word.wordScore;
            });
            setScores(newScores);
            nextPlayer(consecutivePasses * -1, newScores); // resets consecutivePasses by deducting it from itself
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
      setCurrentComponent("WelcomeScreen");
    }
  };

  const closeModal = () => {
    setConfirmMessage(null);
  };

  return (
    <div className="gameScreen__wrapper">
      <div className="gameScreen__main">
        <div className="gameScreen__board">
          <Board
            handleClickSquare={handleClickSquare}
            handleClickPlacedTile={handleClickPlacedTile}
            boardState={boardState}
            isDisabled={boardIsDisabled}
          />
          <TileRack
            playerRackTiles={playerRackTiles}
            handleClickTile={handleClickTile}
          />
        </div>
        <StatusBar
          user={user}
          invitedPlayer={invitedPlayer}
          scores={scores}
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
          gameId={gameData.gameId}
          currentPlayer={currentPlayer}
          socket={socket}
        />
      )}
      </div>
    
      {gameIsOver && (
        <GameOverModal
          scores={scores}
          scoredWords={scoredWords}
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
  );
};

export default GameScreen;
