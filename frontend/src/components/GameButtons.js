import React from "react";
import "../styles/GameButtons.css";

const GameButtons = ({
  getTiles,
  handleClearTiles,
  handleShuffleRack,
  handleConfirmMove,
  handleClickResign,
  handleClickPass,
}) => {
  return (
    <div className="gameButtons__wrapper">
      <button onClick={getTiles}>Get more tiles</button>
      <button onClick={handleClearTiles}>Clear tiles</button>
      <button onClick={handleShuffleRack}>Shuffle tiles</button>
      <button onClick={handleConfirmMove}>Confirm move</button>
      <button onClick={handleClickResign}>Resign</button>
      <button onClick={handleClickPass}>Pass</button>
    </div>
  );
};

export default GameButtons;
