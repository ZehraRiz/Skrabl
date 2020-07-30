import React from "react";
import "../styles/GameOverModal.css";

const GameOverModal = ({
  scores,
  exitGame,
  currentPlayer,
  user,
  invitedPlayer,
}) => {
  const outcome = currentPlayer === true;
  return (
    <div className="gameOverModal__wrapper">
      <div className="gameOverModal__content">
        <h2>You</h2>
        <h3>Scores:</h3>
        <p>Player 0: {scores[0]}</p>
        <p>Player 1: {scores[1]}</p>
        <h4>Highest scoring word:</h4>

        <button onClick={exitGame}>OK</button>
      </div>
    </div>
  );
};

export default GameOverModal;
