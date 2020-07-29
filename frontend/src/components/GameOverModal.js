import React from "react";
import { getHighestScoringWord } from "../utils/getHighestScoringWord";
import "../styles/GameOverModal.css";

const GameOverModal = ({ scores, scoredWords, exitGame }) => {
  const highestScoringWord = getHighestScoringWord(scoredWords);
  return (
    <div className="gameOverModal__wrapper">
      <div className="gameOverModal__content">
        <h3>Scores:</h3>
        <p>Player 0: {scores[0]}</p>
        <p>Player 1: {scores[1]}</p>
        <h4>Highest scoring word:</h4>
        {highestScoringWord && highestScoringWord.word} (
        {highestScoringWord && highestScoringWord.points} points)
        <button onClick={exitGame}>OK</button>
      </div>
    </div>
  );
};

export default GameOverModal;
