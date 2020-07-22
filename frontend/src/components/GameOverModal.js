import React from "react";
import { getHighestScoringWord } from "../utils/getHighestScoringWord";
import "../styles/GameOverModal.css";

const GameOverModal = ({ scores, scoredWords, exitGame }) => {
  const highestScoringWord = getHighestScoringWord(scoredWords);
  return (
    <div className="gameOverModal__wrapper">
      <div className="gameOverModal__content">
        <h4>Scores:</h4>
        <p>Player 0: {scores[0]}</p>
        <p>Player 1: {scores[1]}</p>
        <h3>Highest scoring word:</h3>
        {highestScoringWord.word} ({highestScoringWord.points} points)
        <button onClick={exitGame}>Close</button>
      </div>
    </div>
  );
};

export default GameOverModal;
