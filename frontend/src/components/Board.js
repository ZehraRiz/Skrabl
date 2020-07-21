import React from "react";
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

const Board = ({ handleClickSquare, handleClickPlacedTile, boardState }) => {
  return (
    <div className="board__wrapper">
      <div className="board__board">
        {boardState &&
          boardState.length > 0 &&
          boardState.map((square, index) => {
            const bonusClassName = getBonusClassName(square);
            let placedTile;
            if (square.tile) {
              placedTile = (
                <span
                  className="board__tile"
                  onClick={() => handleClickPlacedTile(square.tile)}
                >
                  <span>{square.tile.letter}</span>
                </span>
              );
            }
            return (
              <div
                className={`board__square ${bonusClassName}`}
                key={index}
                onClick={(e) => handleClickSquare(square)}
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
