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
  if (square.letterMultiplier === 1 && square.wordMultiplier === 1) {
      bonusClassName = "";
  }
  return bonusClassName;
};

const Board = ({
  handleClickSquare,
  handleClickPlacedTile,
  boardState,
  isDisabled,
}) => {
  return (
    <div className="board__wrapper">
      <div className={"board__board " + (isDisabled ? "disabled" : "")}>
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
                  <span className="tile__points--sm">{square.tile.points}</span>
                </span>
              );
            }
            return (
              <div
                className={`board__square ${bonusClassName} ${
                  index === 112 && "board__centre"
                }`}
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
