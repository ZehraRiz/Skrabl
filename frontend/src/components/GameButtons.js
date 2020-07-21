import React from "react";
import "../styles/GameButtons.css";

const GameButtons = ({ getTiles, handleClearTiles }) => {
  return (
    <div className="gameButtons__wrapper">
      <button onClick={getTiles}>Get more tiles</button>
      <button onClick={handleClearTiles}>Clear Tiles</button>
    </div>
  );
};

export default GameButtons;
