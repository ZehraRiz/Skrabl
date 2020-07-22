import React from "react";
import { getHighestScoringWord } from "../utils/getHighestScoringWord";
import "../styles/GameOverModal.css";

const GameOverModal = ({ scores, scoredWords, handleCloseModal }) => {
  return (
    <div className="gameOverModal__wrapper">
      <div className="gameOverModal__content">
        <h4>Scores:</h4>
        <p>Player 0: {scores[0].score}</p>
        <p>Player 1: {scores[1].score}</p>
        <h3>Highest scoring word:</h3>
        {getHighestScoringWord(scoredWords)}
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default GameOverModal;
