import React, { useState, useEffect } from "react";
import Board from "../components/Board";
import TileRack from "./TileRack";
import StatusBar from "./StatusBar";
import Chat from "./Chat";
import GameButtons from "./GameButtons";
import ConfirmModal from "./ConfirmModal";
import GameOverModal from "./GameOverModal";
import { generateBoardSquares } from "../utils/generateBoardSquares";
import { shuffle } from "../utils/shuffle";
import { moveIsValid } from "../utils/moveIsValid";
import { squaresAreOccupied } from "../utils/squaresAreOccupied";
import { getScoresFromWords } from "../utils/getScoresFromWords";
import { bonusSquareIndices } from "../assets/bonusSquareIndices";
import axios from "axios";
import "../styles/GameScreen.css";

const GameScreen = ({
  setNotification,
  chat,
  handleSendMessage,
  setCurrentComponent,
  currentPlayer,
  gameData,
  socket
}) => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedSquareIndex, setSelectedSquareIndex] = useState(null);
  const [playerRackTiles, setPlayerRackTiles] = useState(currentPlayer===0? gameData.gameState.player1Tiles: gameData.gameState.player1Tiles);
  const [placedTiles, setPlacedTiles] = useState([]);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [boardState, setBoardState] = useState(gameData.gameState.boardState);
  const [timeLeftPlayer, setTimeLeftPlayer] = useState(currentPlayer===0? gameData.gameState. player1TimeLeft: gameData.gameState. player2TimeLeft);
  const [timeLeftOpponent, setTimeLeftOpponent] = useState(currentPlayer===1? gameData.gameState. player1TimeLeft: gameData.gameState. player2TimeLeft);
  const [scoredWords, setScoredWords] = useState({ 0: [], 1: [] });
  const [scores, setScores] = useState({ 0: 0, 1: 0 });
  const [turn, setTurn] = useState(gameData.gameState.turn)
  console.log("turn of "+ turn)

  //EFFECTS

  useEffect(() => {
    getBoard();
  }, []);

  useEffect(() => {
    getTiles();
  }, []);

  useEffect(() => {
    updateBackend();
  }, [currentPlayer]);

  useEffect(() => {
    updateScores();
  }, [scoredWords]);

  useEffect(() => {
    placeTile();
  }, [selectedSquareIndex]);

  const getBoard = () => {
    const squares = generateBoardSquares(bonusSquareIndices);
    setBoardState([...squares]);
  };

  //*dummy function* - will get tiles from backend
  const getTiles = () => {
    const numTilesNeeded = 7 - playerRackTiles.length;
    socket.emit("requestTiles", { gameId: gameData.gameId, numTilesNeeded: numTilesNeeded, player: currentPlayer });
    socket.on("gameEnded", (data) => console.log(data))
    socket.on("sendingTiles", (data) => {
      setPlayerRackTiles([...playerRackTiles, ...data]);
    })
    
    //const numTilesNeeded = 7 - playerRackTiles.length;
    // const randomTiles = [];
    // for (let i = 0; i < numTilesNeeded; i++) {
    //   randomTiles.push({ id: i, letter: "b", points: i });
    // }
    // setPlayerRackTiles([...playerRackTiles, ...randomTiles]);
  };

  const updateBackend = () => {
    socket.emit("updateGameState", { gameId: gameData.gameId, boardState:boardState, playerRackTiles: playerRackTiles, player: currentPlayer });
    socket.on("gameEnded", (data) => console.log(data))
    socket.on("gameUpdated", (data) => {
      console.log(data);
      //sould do setting function here
    })

    // const currentGameState = {
    //   boardState,
    //   playerRackTiles,
    // };
    
  };

  const updateScores = () => {
    //BACKEND FUNCION AND NEW TURN?
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
    if (currentPlayer !== turn) return;
    if (selectedTile) {
      setSelectedSquareIndex(square.index);
    }
  };

  const handleClickPlacedTile = (tileToRemove) => {
    if (selectedTile || currentPlayer !== turn) return;

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

  const handleClickShuffle = () => {
    const shuffled = shuffle([...playerRackTiles]);
    setPlayerRackTiles([...shuffled]);
  };

  const handleClickTile = (tile) => {
    if (currentPlayer !== turn) return;
    setSelectedTile(tile);
  };

  const handleResign = () => {
    closeModal();
    gameOver();
  };

  const handlePass = () => {
    closeModal();
    nextPlayer();
  };

  const handleClickExchangeTiles = () => {
    console.log("exhange tiles");
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
      console.log("move is valid");
      //get array of words formed in turn (objects)
      //EXAMPLE:
      const formedWords = [
        { word: "house", points: 7 },
        { word: "cat", points: 4 },
        { word: "tea", points: 3 },
      ];
      axios
        .post("http://localhost:4001/verifyWord", { words: formedWords })
        .then((res) => {
          const results = res.data;
          if (Object.values(results).every((val) => val === "true")) {
            console.log("words are verified (using dummy words)");
            const updatedScoredWords = {
              ...scoredWords,
              [currentPlayer]: [...scoredWords[currentPlayer], ...formedWords],
            };
            setScoredWords(updatedScoredWords);
            //*scores are updated automatically
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

  //OTHER

  const gameOver = () => {
    //handle In backend
    setGameIsOver(true);
  };

  const exitGame = () => {
    //handle in backend
    setCurrentComponent("Players");
  };

  const nextPlayer = () => {
    //handle in backend
    console.log("in next player")
    turn === 0 ? setTurn(1) : setTurn(0);
  };

  const closeModal = () => {
    setConfirmMessage(null);
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
            handleClickTile={handleClickTile}
          />
          <GameButtons
            getTiles={getTiles}
            handleClickClearTiles={handleClickClearTiles}
            handleClickShuffle={handleClickShuffle}
            handleClickConfirmMove={handleClickConfirmMove}
            handleClickResign={handleClickResign}
            handleClickPass={handleClickPass}
            handleClickExchangeTiles={handleClickExchangeTiles}
          />
        </div>
      </div>
      <Chat chat={chat} handleSendMessage={handleSendMessage} />
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
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default GameScreen;