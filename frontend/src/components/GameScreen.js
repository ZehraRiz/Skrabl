import React, { useState, useEffect } from "react";
import Board from "../components/Board";
import TileRack from "../components/TileRack";
import { bonusSquareIds } from "../assets/bonusSquareIds";
import { generateBoardSquares } from "../utils/generateBoardSquares";
import GameMenu from "./GameMenu";
import "../styles/GameScreen.css";

const GameScreen = ({ setNotification }) => {
  const squares = generateBoardSquares(bonusSquareIds);

  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedSquareId, setSelectedSquareId] = useState(null);
  const [tilesOnBoard, setTilesOnBoard] = useState([]);
  const [playerTiles, setPlayerTiles] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(true);

  const scores = { player1: 20, player2: 30 };

  //DUMMY FUNCTION - will need to call backend
  const getTiles = () => {
    const numTilesNeeded = 7 - playerTiles.length;
    const randomTiles = [];
    for (let i = 0; i < numTilesNeeded; i++) {
      randomTiles.push({ id: i, letter: "b", points: 3 });
    }
    setPlayerTiles([...playerTiles, ...randomTiles]);
  };

  useEffect(() => {
    getTiles();
  }, []);

  const handleSelectTile = (tile) => {
    setSelectedTile(tile);
  };

  const handleSelectSquare = (squareId) => {
    if (selectedTile) {
      setSelectedSquareId(squareId);
    }
  };

  useEffect(() => {
    if (selectedSquareId !== null) {
      //add tile to board
      setTilesOnBoard([
        ...tilesOnBoard,
        { ...selectedTile, square: selectedSquareId },
      ]);
      //and remove from tile rack
      setPlayerTiles([
        ...playerTiles.filter((tile) => tile.id !== selectedTile.id),
      ]);
    }
  }, [selectedSquareId]);

  return (
    <div className="gameScreen__wrapper">
      <div className="gameScreen__content">
        <GameMenu
          getTiles={getTiles}
          scores={scores}
          gameInProgress={gameInProgress}
          setNotification={setNotification}
        />
        <div className="gameScreen__main">
          <div className="gameScreen__boardAndRack">
            <Board
              squares={squares}
              handleSelectSquare={handleSelectSquare}
              tilesOnBoard={tilesOnBoard}
            />
            <TileRack
              playerTiles={playerTiles}
              handleSelectTile={handleSelectTile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
