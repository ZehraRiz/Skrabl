import React from "react";
import "../styles/GameOverModal.css";

const GameOverModal = ({ winner, scores, handleCloseModal }) => {
  return (
    <div className="gameOverModal__wrapper">
      <div className="gameOverModal__content">
        <h3>The winner is {winner}!</h3>
        <h4>Scores:</h4>
        <p>Player 0: {scores[0].score}</p>
        <p>Player 1: {scores[1].score}</p>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default GameOverModal;
