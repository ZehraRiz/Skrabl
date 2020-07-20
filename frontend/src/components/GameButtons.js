import React from "react";
import "../styles/GameButtons.css";

const GameButtons = ({ getTiles }) => {
  return (
    <div className="gameButtons__wrapper">
      <button onClick={getTiles}>Get more tiles</button>
    </div>
  );
};

export default GameButtons;
