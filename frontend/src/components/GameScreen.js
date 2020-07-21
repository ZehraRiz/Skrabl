import React, { useState, useEffect } from "react";
import Board from "../components/Board";
import TileRack from "../components/TileRack";
import { bonusSquareIds } from "../assets/bonusSquareIds";
import { generateBoardSquares } from "../utils/generateBoardSquares";
import { shuffleArray } from "../utils/shuffleArray";
import StatusBar from "./StatusBar";
import Chat from "./Chat";
import GameButtons from "./GameButtons";
import "../styles/GameScreen.css";

const GameScreen = ({ setNotification }) => {
  const squares = generateBoardSquares(bonusSquareIds);
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedSquareId, setSelectedSquareId] = useState(null);
  const [allTilesOnBoard, setAllTilesOnBoard] = useState([]);
  const [playerRackTiles, setPlayerRackTiles] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(true);
  const [placedTiles, setPlacedTiles] = useState([]);

  const scores = { player1: 20, player2: 30 };

  //DUMMY FUNCTION - will need to call backend
  const getTiles = () => {
    const numTilesNeeded = 7 - playerRackTiles.length;
    const randomTiles = [];
    for (let i = 0; i < numTilesNeeded; i++) {
      randomTiles.push({ id: i, letter: "b", points: 3 });
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
    // setPlacedTiles([]);
  };

  const handleShuffleRack = () => {
    const shuffled = shuffleArray([...playerRackTiles]);
    setPlayerRackTiles([...shuffled]);
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
      setAllTilesOnBoard([
        ...allTilesOnBoard,
        { ...selectedTile, square: selectedSquareId },
      ]);
      setPlacedTiles([
        ...placedTiles,
        { ...selectedTile, square: selectedSquareId },
      ]);
      setPlayerRackTiles([
        ...playerRackTiles.filter((tile) => tile.id !== selectedTile.id),
      ]);
    }
    //update board state in backend here?
  }, [selectedSquareId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(e.target.message.value);
    //emit message to backend here
    e.target.reset();
  };

  const chat = [
    "Hi",
    "Hello",
    "How are you?",
    "Fine, thanks.",
    "What are you doing?",
    "Playing Scrabble. How about you?",
    "The same",
  ];

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
          />
        </div>
      </div>
      <Chat chat={chat} handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default GameScreen;
