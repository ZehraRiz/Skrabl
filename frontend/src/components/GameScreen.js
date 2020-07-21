import React, { useState, useEffect } from "react";
import Board from "../components/Board";
import TileRack from "../components/TileRack";
import { bonusSquareIndices } from "../assets/bonusSquareIndices";
import { generateBoardSquares } from "../utils/generateBoardSquares";
import { shuffleArray } from "../utils/shuffleArray";
import StatusBar from "./StatusBar";
import Chat from "./Chat";
import GameButtons from "./GameButtons";
import axios from "axios";
import "../styles/GameScreen.css";
import ConfirmModal from "./ConfirmModal";
import GameOverModal from "./GameOverModal";

const GameScreen = ({
  setNotification,
  chat,
  handleSendMessage,
  nextPlayer,
  playerIndex,
  setCurrentComponent,
  currentPlayer,
}) => {
  const squares = generateBoardSquares(bonusSquareIndices);
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedSquareIndex, setSelectedSquareIndex] = useState(null);
  const [allTilesOnBoard, setAllTilesOnBoard] = useState([]);
  const [playerRackTiles, setPlayerRackTiles] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(true);
  const [placedTiles, setPlacedTiles] = useState([]);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(null);

  useEffect(() => {
    getTiles();
  }, []);

  useEffect(() => {
    updateBackend();
  }, [currentPlayer]);

  const updateBackend = () => {
    console.log("updating backend");
    const currentGameState = {
      allTilesOnBoard,
      playerRackTiles,
    };
    //send to backend here
  };

  //DUMMY DATA
  const scores = { 0: 20, 1: 30 };

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
    const placedTilesIds = placedTiles.map((tile) => tile.id);
    const updatedTilesOnBoard = [
      ...allTilesOnBoard.filter((tile) => !placedTilesIds.includes(tile.id)),
    ];
    setAllTilesOnBoard([...updatedTilesOnBoard]);
    setPlacedTiles([]);
  };

  const handleShuffleRack = () => {
    const shuffled = shuffleArray([...playerRackTiles]);
    setPlayerRackTiles([...shuffled]);
  };

  const handleSelectTile = (tile) => {
    if (playerIndex !== currentPlayer) {
      return;
    }
    setSelectedTile(tile);
  };

  const handleSelectSquare = (squareIndex) => {
    if (selectedTile) {
      setSelectedSquareIndex(squareIndex);
    }
  };

  const handleConfirmMove = () => {
    //get array of words formed in turn
    //then call backend for verification (sending array of strings):
    // axios.post("http://localhost:4001/verifyWord", {words: formedWords}).then(res => {
    //   console.log(res.results)
    // })
    //if all true, get points for turn, update score object and call nextPlayer()
    //if not all words are valid, update notifications in App.js and return
    console.log("move confirmed - calling nextPlayer()");
    nextPlayer();
  };

  const gameOver = () => {
    //setting gameIsOver to true
    setGameIsOver(true);
  };

  useEffect(() => {
    //if user has selected a tile and then a square, place the tile on the square
    if (selectedSquareIndex !== null) {
      setAllTilesOnBoard([
        ...allTilesOnBoard,
        { ...selectedTile, square: selectedSquareIndex },
      ]);
      setPlacedTiles([
        ...placedTiles,
        { ...selectedTile, square: selectedSquareIndex },
      ]);
      setPlayerRackTiles([
        ...playerRackTiles.filter((tile) => tile.id !== selectedTile.id),
      ]);
      setSelectedTile(null);
    }
    //update board state in backend here?
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
            gameInProgress={gameInProgress}
            setNotification={setNotification}
          />
          <Board
            squares={squares}
            handleSelectSquare={handleSelectSquare}
            allTilesOnBoard={allTilesOnBoard}
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
