import React, { useEffect, useState } from "react";
import { removeDashes } from "../utils/removeDashes";
import "../styles/Board.css";

const getBonusClassName = (square) => {
  let bonusClassName = "";
  if (square.letterMultiplier) {
    square.letterMultiplier === 2
      ? (bonusClassName = "double-letter")
      : (bonusClassName = "triple-letter");
  } else if (square.wordMultiplier) {
    square.wordMultiplier === 2
      ? (bonusClassName = "double-word")
      : (bonusClassName = "triple-word");
  }
  return bonusClassName;
};

const Board = ({ squares, handleSelectSquare, allTilesOnBoard }) => {
  const [occupiedSquaresIds, setOccupiedSquareIds] = useState([]);

  useEffect(() => {
    const squareIds = allTilesOnBoard.map((tile) => tile.square);
    setOccupiedSquareIds(squareIds);
  }, [allTilesOnBoard]);

  const createPlacedTile = (index) => {
    if (occupiedSquaresIds.includes(index) && allTilesOnBoard.length > 0) {
      let placedTile;
      const tile = allTilesOnBoard.filter((tile) => tile.square === index)[0];
      //ideally would use same Tile component here as in rack but styling is a bit tricky
      placedTile = (
        <span className="board__tile">
          <span>{tile.letter}</span>
        </span>
      );
      return placedTile;
    } else {
      return null;
    }
  };

  return (
    <div className="board__wrapper">
      <div className="board__board">
        {squares &&
          squares.map((square, index) => {
            const bonusClassName = getBonusClassName(square);
            const placedTile = createPlacedTile(index);
            return (
              <div
                className={`board__square ${bonusClassName}`}
                key={index}
                onClick={(e) => handleSelectSquare(square.id)}
              >
                {!placedTile && (
                  <span className="board__bonus-text">
                    {removeDashes(bonusClassName).toUpperCase()}
                  </span>
                )}
                {placedTile && placedTile}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Board;
