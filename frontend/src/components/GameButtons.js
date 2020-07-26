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
      <button onClick={getTiles}>Get more</button>
      <button onClick={handleClickClearTiles}>Clear</button>
      <button onClick={handleClickShuffle}>Shuffle</button>
      <button onClick={handleClickExchangeTiles}>Exchange</button>
      <button onClick={handleClickConfirmMove}>Confirm</button>
      <button onClick={handleClickResign}>Resign</button>
      <button onClick={handleClickPass}>Pass</button>
    </div>
  );
};

export default GameButtons;
