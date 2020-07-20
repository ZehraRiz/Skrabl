import React from "react";
import "../styles/GameMenu.css";

const GameMenu = ({ getTiles }) => {
  return (
    <div className="gameMenu__wrapper">
      <button onClick={getTiles}>Get more tiles</button>
    </div>
  );
};

export default GameMenu;
