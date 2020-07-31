import React from "react";
import "../styles/GameButtons.css";
import shuffle from "../images/shuffle.svg";
import exchange from "../images/swap.svg";
import pass from "../images/pass.svg";
import confirm from "../images/confirm.svg";
import resign from "../images/stop.svg";

const GameButtons = React.memo(
  ({
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
        <button onClick={handleClickShuffle}>
          <div className="button__text">
            <img className="button__icon" src={shuffle} />
            Shuffle
          </div>
        </button>
        <button onClick={handleClickExchangeTiles}>
          <div className="button__text">
            <img className="button__icon" src={exchange} />
            Swap
          </div>
        </button>
        {numPlacedTiles === 0 && (
          <button onClick={handleClickPass}>
            <div className="button__text">
              <img className="button__icon" src={pass} />
              Pass
            </div>
          </button>
        )}
        {numPlacedTiles > 0 && (
          <button onClick={handleClickConfirmMove}>
            <div className="button__text">
              <img className="button__icon" src={confirm} />
              Confirm
            </div>
          </button>
        )}
        <button onClick={handleClickResign}>
          <div className="button__text">
            <img className="button__icon" src={resign} />
            Resign
          </div>
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.placedTiles.length === nextProps.placedTiles.length) {
      return true; // props are equal
    }
    return false; // props are not equal -> update the component
  }
);

export default GameButtons;
