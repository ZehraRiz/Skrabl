import React from "react";
import Scoreboard from "./Scoreboard";
import "../styles/GameMenu.css";

const GameMenu = ({ getTiles }) => {
  return (
    <div className="gameMenu__wrapper">
      <button onClick={getTiles}>Get more tiles</button>
      <Scoreboard scores={{ player1: 20, player2: 30 }} />
    </div>
  );
};

export default GameMenu;
