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

const Board = ({ squares, handleSelectSquare, tilesOnBoard }) => {
  const [occupiedSquaresIds, setOccupiedSquareIds] = useState([]);

  useEffect(() => {
    if (tilesOnBoard.length > 0) {
      const squareIds = tilesOnBoard.map((tile) => tile.square);
      setOccupiedSquareIds(squareIds);
    }
  }, [tilesOnBoard]);

  const createPlacedTile = (index) => {
    if (occupiedSquaresIds.includes(index)) {
      let placedTile;
      const tile = tilesOnBoard.filter((tile) => tile.square === index)[0];
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
