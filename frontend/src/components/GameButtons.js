import React from "react";
import "../styles/GameButtons.css";

const GameButtons = ({
  getTiles,
  handleClickClearTiles,
  handleClickShuffle,
  handleClickConfirmMove,
  handleClickResign,
  handleClickPass,
  handleClickExchangeTiles,
}) => {
  return (
    <div className="gameButtons__wrapper">
      <button onClick={getTiles}>Get more tiles</button>
      <button onClick={handleClickClearTiles}>Clear tiles</button>
      <button onClick={handleClickShuffle}>Shuffle tiles</button>
      <button onClick={handleClickExchangeTiles}>Exchange tiles</button>
      <button onClick={handleClickConfirmMove}>Confirm move</button>
      <button onClick={handleClickResign}>Resign</button>
      <button onClick={handleClickPass}>Pass</button>
    </div>
  );
};

export default GameButtons;
