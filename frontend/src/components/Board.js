import React from "react";
import { removeDashes } from "../utils/removeDashes";
import "../styles/Board.css";

const Board = ({ squares }) => {
  return (
    <div className="board__wrapper">
      <div className="board__outer">
        <div className="board__board">
          <div className="board__content">
            {squares &&
              squares.map((square, index) => {
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
                return (
                  <div
                    className={`board__square ${bonusClassName}`}
                    key={index}
                  >
                    <span className="board__bonus-text">
                      {removeDashes(bonusClassName).toUpperCase()}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
