import React from "react";
import Header from "../components/Header";
import Board from "../components/Board";
import TileRack from "../components/TileRack";
import { bonusSquareIds } from "../assets/bonusSquareIds";
import { generateBoardSquares } from "../utils/generateBoardSquares";
const squares = generateBoardSquares(bonusSquareIds);

const Game = () => {
  return (
    <div>
      <Header />
      <Board squares={squares} />
      <TileRack
        tiles={[
          { letter: "b", points: 3 },
          { letter: "a", points: 1 },
          { letter: "g", points: 3 },
          { letter: "b", points: 3 },
          { letter: "a", points: 1 },
          { letter: "g", points: 3 },
          { letter: "g", points: 3 },
        ]}
      />
    </div>
  );
};

export default Game;
