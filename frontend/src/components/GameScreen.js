import React, { useState, useEffect } from "react";
import Board from "../components/Board";
import TileRack from "../components/TileRack";
import { bonusSquareIndices } from "../assets/bonusSquareIndices";
import { generateBoardSquares } from "../utils/generateBoardSquares";
import { shuffle } from "../utils/shuffle";
import StatusBar from "./StatusBar";
import Chat from "./Chat";
import GameButtons from "./GameButtons";
import axios from "axios";
import ConfirmModal from "./ConfirmModal";
import GameOverModal from "./GameOverModal";
import { moveIsValid } from "../utils/moveIsValid";
import { squaresAreOccupied } from "../utils/squaresAreOccupied";
import "../styles/GameScreen.css";

const GameScreen = ({
  setNotification,
  chat,
  handleSendMessage,
  setCurrentPlayer,
  setCurrentComponent,
  currentPlayer,
}) => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedSquareIndex, setSelectedSquareIndex] = useState(null);
  const [playerRackTiles, setPlayerRackTiles] = useState([]);
  const [placedTiles, setPlacedTiles] = useState([]);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [boardState, setBoardState] = useState();
  const [timeLeftPlayer, setTimeLeftPlayer] = useState(1200000);
  const [timeLeftOpponent, setTimeLeftOpponent] = useState(1200000);
  const [scores, setScores] = useState({ 0: 0, 1: 0 });

  useEffect(() => {
    getTiles();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateBackend();
    //eslint-disable-next-line
  }, [currentPlayer]);

  useEffect(() => {
    const squares = generateBoardSquares(bonusSquareIndices);
    setBoardState([...squares]);
    //eslint-disable-next-line
  }, []);

  const updateBackend = () => {
    const currentGameState = {
      // allTilesOnBoard,
      boardState,
      playerRackTiles,
    };
    //send to backend here
  };

  //DUMMY FUNCTION - will need to call backend
  const getTiles = () => {
    const numTilesNeeded = 7 - playerRackTiles.length;
    const randomTiles = [];
    for (let i = 0; i < numTilesNeeded; i++) {
      randomTiles.push({ id: i, letter: "b", points: i });
    }
    setPlayerRackTiles([...playerRackTiles, ...randomTiles]);
  };

  const handleClearTiles = () => {
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

  const handleShuffleRack = () => {
    const shuffled = shuffle([...playerRackTiles]);
    setPlayerRackTiles([...shuffled]);
  };

  const handleSelectTile = (tile) => {
    if (currentPlayer !== 0) {
      return;
    }
    setSelectedTile(tile);
  };

  const handleClickPlacedTile = (tileToRemove) => {
    //remove tile from board when clicked
    if (selectedTile) {
      return;
    }
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

  const handleClickSquare = (square) => {
    if (selectedTile) {
      setSelectedSquareIndex(square.index);
    }
  };

  const handleConfirmMove = () => {
    if (moveIsValid(placedTiles, boardState)) {
      console.log("move is valid");
      //get array of words formed in turn e.g.
      const formedWords = ["house", "cat", "tea"];
      axios
        .post("http://localhost:4001/verifyWord", { words: formedWords })
        .then((res) => {
          const results = res.data;
          if (Object.values(results).every((val) => val === "true")) {
            console.log("words are verified (using dummy words)");
            //update score object here
            nextPlayer();
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

  const gameOver = () => {
    setGameIsOver(true);
  };

  const nextPlayer = () => {
    setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
  };

  useEffect(() => {
    //if user has selected a tile and then a square, place the tile on the square
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
    //eslint-disable-next-line
  }, [selectedSquareIndex]);

  const handleCloseModal = () => {
    setCurrentComponent("Players");
  };

  const closeConfirmModal = () => {
    setConfirmMessage(null);
  };

  const handleClickResign = () => {
    setConfirmMessage({
      type: "resign",
      message: "Are you sure you want to resign?",
    });
  };
  const handleResign = () => {
    closeConfirmModal();
    gameOver();
  };

  const handleClickPass = () => {
    setConfirmMessage({
      type: "pass",
      message: "Are you sure you want to pass?",
    });
  };
  const handlePass = () => {
    closeConfirmModal();
    nextPlayer();
  };

  return (
    <div className="gameScreen__wrapper">
      <div className="gameScreen__main">
        <div className="gameScreen__board">
          <StatusBar
            scores={scores}
            setNotification={setNotification}
            timeLeftPlayer={timeLeftPlayer}
            timeLeftOpponent={timeLeftOpponent}
            setTimeLeftPlayer={setTimeLeftPlayer}
            setTimeLeftOpponent={setTimeLeftOpponent}
            currentPlayer={currentPlayer}
          />
          <Board
            handleClickSquare={handleClickSquare}
            handleClickPlacedTile={handleClickPlacedTile}
            boardState={boardState}
          />
          <TileRack
            playerRackTiles={playerRackTiles}
            handleSelectTile={handleSelectTile}
          />
          <GameButtons
            getTiles={getTiles}
            handleClearTiles={handleClearTiles}
            handleShuffleRack={handleShuffleRack}
            handleConfirmMove={handleConfirmMove}
            handleClickResign={handleClickResign}
            handleClickPass={handleClickPass}
          />
        </div>
      </div>
      <Chat chat={chat} handleSendMessage={handleSendMessage} />
      {gameIsOver && (
        <GameOverModal
          winner="Tom"
          scores={scores}
          handleCloseModal={handleCloseModal}
        />
      )}
      {confirmMessage && (
        <ConfirmModal
          message={confirmMessage}
          handleResign={handleResign}
          handlePass={handlePass}
          handleCancel={closeConfirmModal}
        />
      )}
    </div>
  );
};

export default GameScreen;
