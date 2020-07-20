import React from "react";
import "../styles/Scoreboard.css";

const Scoreboard = ({ scores }) => {
  return (
    <div className="scoreboard__wrapper">
      <h4>Scores:</h4>
      <span>Player 1: {scores.player1}</span>
      <span>Player 2: {scores.player2}</span>
    </div>
  );
};

export default Scoreboard;
