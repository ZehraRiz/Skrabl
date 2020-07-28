import React from "react";
import "../styles/GameButtons.css";
import shuffle from "../images/025-shuffle.svg";
import exchange from "../images/006-loop-1.svg";
import pass from "../images/032-forwards.svg";
import confirm from "../images/013-play.svg";
import resign from "../images/003-stop.svg";

const GameButtons = ({
  handleClickClearTiles,
  handleClickShuffle,
  handleClickConfirmMove,
  handleClickResign,
  handleClickPass,
  handleClickExchangeTiles,
  placedTiles,
}) => {
  const numPlacedTiles = placedTiles.length;
  return (
    <div className="gameButtons__wrapper">
      <button onClick={handleClickShuffle}><div className="button__text"><img className="button__icon" src={shuffle} />Shuffle</div></button>
      <button onClick={handleClickExchangeTiles}><div className="button__text"><img className="button__icon" src={exchange} />Exchange</div></button>
      {numPlacedTiles === 0 && <button onClick={handleClickPass}><div className="button__text"><img className="button__icon" src={pass} />Pass</div></button>}
      {numPlacedTiles > 0 && (
        <button onClick={handleClickConfirmMove}><div className="button__text"><img className="button__icon" src={confirm} />Confirm</div></button>
      )}
      <button onClick={handleClickResign}><div className="button__text"><img className="button__icon" src={resign} />Resign</div></button>
    </div>
  );
};

export default GameButtons;
