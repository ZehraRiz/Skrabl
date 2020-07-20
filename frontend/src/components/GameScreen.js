import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Board from "../components/Board";
import TileRack from "../components/TileRack";
import { bonusSquareIds } from "../assets/bonusSquareIds";
import { generateBoardSquares } from "../utils/generateBoardSquares";

const Game = () => {
  const squares = generateBoardSquares(bonusSquareIds);

  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedSquareId, setSelectedSquareId] = useState(null);
  const [tilesOnBoard, setTilesOnBoard] = useState([]);
  const [playerTiles, setPlayerTiles] = useState([]);

  useEffect(() => {
    //get tiles from pouch in backend here
    const randomTiles = [
      { id: 1, letter: "b", points: 3 },
      { id: 2, letter: "a", points: 1 },
      { id: 3, letter: "g", points: 3 },
      { id: 4, letter: "t", points: 4 },
      { id: 5, letter: "s", points: 1 },
      { id: 6, letter: "o", points: 1 },
      { id: 7, letter: "q", points: 5 },
    ];
    setPlayerTiles(randomTiles);
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
    <div>
      <Header />
      <Board
        squares={squares}
        handleSelectSquare={handleSelectSquare}
        tilesOnBoard={tilesOnBoard}
      />
      <TileRack playerTiles={playerTiles} handleSelectTile={handleSelectTile} />
    </div>
  );
};

export default Game;
