import React from "react";
import "../styles/GameButtons.css";

const GameButtons = ({ getTiles, handleClearTiles, handleShuffleRack }) => {
  return (
    <div className="gameButtons__wrapper">
      <button onClick={getTiles}>Get more tiles</button>
      <button onClick={handleClearTiles}>Clear</button>
      <button onClick={handleShuffleRack}>Shuffle</button>
    </div>
  );
};

export default GameButtons;
