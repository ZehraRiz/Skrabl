import React from "react";
import { camelToSentence } from "../utils/camelToSentence";
import "../styles/Board.css";

const Board = ({ squares }) => {
  return (
    <div className="board__wrapper">
      <div className="board__board">
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
              <div className={`board__square ${bonusClassName}`} key={index}>
                {camelToSentence(bonusClassName).toUpperCase()}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Board;
