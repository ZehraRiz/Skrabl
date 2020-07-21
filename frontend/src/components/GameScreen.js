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

const GameScreen = ({
  setNotification,
  chat,
  handleSendMessage,
  currentPlayer,
  setCurrentPlayer,
  nextPlayer,
  playerIndex,
}) => {
  const squares = generateBoardSquares(bonusSquareIndices);
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedSquareIndex, setSelectedSquareIndex] = useState(null);
  const [allTilesOnBoard, setAllTilesOnBoard] = useState([]);
  const [playerRackTiles, setPlayerRackTiles] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(true);
  const [placedTiles, setPlacedTiles] = useState([]);

  useEffect(() => {
    getTiles();
  }, []);

  const scores = { player1: 20, player2: 30 };

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
          />
        </div>
      </div>
      <Chat chat={chat} handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default GameScreen;
