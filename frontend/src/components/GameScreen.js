import React, { useState, useEffect } from "react";
import Board from "../components/Board";
import TileRack from "../components/TileRack";
import { bonusSquareIndices } from "../assets/bonusSquareIndices";
import { generateBoardSquares } from "../utils/generateBoardSquares";
import { shuffleArray } from "../utils/shuffleArray";
import StatusBar from "./StatusBar";
import Chat from "./Chat";
import GameButtons from "./GameButtons";
// import axios from "axios";
import "../styles/GameScreen.css";
import ConfirmModal from "./ConfirmModal";
import GameOverModal from "./GameOverModal";
import { moveIsValid } from "../utils/moveIsValid";

const GameScreen = ({
  setNotification,
  chat,
  handleSendMessage,
  nextPlayer,
  playerIndex,
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
    const shuffled = shuffleArray([...playerRackTiles]);
    setPlayerRackTiles([...shuffled]);
  };

  const handleSelectTile = (tile) => {
    if (playerIndex !== currentPlayer) {
      return;
    }
    setSelectedTile(tile);
  };

  const handleClickPlacedTile = (tileToRemove) => {
    //remove tile from board when clicked
    if (tileToRemove.player === playerIndex) {
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
      //get array of words formed in turn
      //then call backend for verification (sending array of strings):
      // axios.post("http://localhost:4001/verifyWord", {words: formedWords}).then(res => {
      //   console.log(res.results)
      // })
      //if all true, get points for turn, update score object and call nextPlayer()
      //if not all words are valid, set notification and return
      //get points here
      return;
    } else {
      setNotification("move is not valid");
      return;
    }
  };

  const gameOver = () => {
    setGameIsOver(true);
  };

  useEffect(() => {
    //if user has selected a tile and then a square, place the tile on the square
    if (selectedSquareIndex !== null) {
      const tileToAdd = {
        ...selectedTile,
        square: selectedSquareIndex,
        player: playerIndex,
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
          <StatusBar scores={scores} setNotification={setNotification} />
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
