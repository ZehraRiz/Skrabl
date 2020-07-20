import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Board from "../components/Board";
import TileRack from "../components/TileRack";
import { bonusSquareIds } from "../assets/bonusSquareIds";
import { generateBoardSquares } from "../utils/generateBoardSquares";
import GameMenu from "./GameMenu";
import "../styles/GameScreen.css";

const Game = () => {
  const squares = generateBoardSquares(bonusSquareIds);

  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedSquareId, setSelectedSquareId] = useState(null);
  const [tilesOnBoard, setTilesOnBoard] = useState([]);
  const [playerTiles, setPlayerTiles] = useState([]);

  //DUMMY FUNCTION - will need to call backend
  const getTiles = () => {
    debugger;
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
      <Header />
      <div className="gameScreen__content">
        <GameMenu getTiles={getTiles} />
        <div className="gameScreen__main">
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
  );
};

export default Game;
