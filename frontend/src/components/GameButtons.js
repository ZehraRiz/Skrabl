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
  placedTiles
}) => {
  const numPlacedTiles = placedTiles.length;
  return (
    <div className="gameButtons__wrapper">
      <button onClick={getTiles}>Get more</button>
      <button onClick={handleClickShuffle}>Shuffle</button>
      <button onClick={handleClickExchangeTiles}>Exchange</button>
      {numPlacedTiles === 0 && <button onClick={handleClickPass}>Pass</button>}
      {numPlacedTiles > 0 && <button onClick={handleClickConfirmMove}>Confirm</button>}
      <button onClick={handleClickResign}>Resign</button>
      
    </div>
  );
};

export default GameButtons;
