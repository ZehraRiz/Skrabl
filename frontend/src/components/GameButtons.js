import React from "react";
import "../styles/GameButtons.css";
import shuffle from "../images/shuffle.svg";
import exchange from "../images/swap.svg";
import pass from "../images/pass.svg";
import confirm from "../images/confirm.svg";
import resign from "../images/stop.svg";

const GameButtons = ({
  handleClickShuffle,
  handleClickConfirmMove,
  handleClickResign,
  handleClickPass,
  handleClickExchangeTiles,
  placedTiles,
  lang,
}) => {
  const numPlacedTiles = placedTiles.length;
  return (
    <div className="gameButtons__wrapper">
      <button onClick={handleClickShuffle}>
        <div className="button__text">
          <img className="button__icon" src={shuffle} />
          {lang === "en" && "Shuffle"}
          {lang === "tr" && "Karıştır"}
          {lang === "fr" && "Mélanger"}
          {lang === "de" && "Mische "}
        </div>
      </button>
      <button onClick={handleClickExchangeTiles}>
        <div className="button__text">
          <img className="button__icon" src={exchange} />
          {lang === "en" && "Swap"}
          {lang === "tr" && "Değiştir"}
          {lang === "fr" && "Changer"}
          {lang === "de" && "Wechseln "}
        </div>
      </button>
      {numPlacedTiles === 0 && (
        <button onClick={handleClickPass}>
          <div className="button__text">
            <img className="button__icon" src={pass} />
            {lang === "en" && "Pass"}
            {lang === "tr" && "Pas geç"}
            {lang === "fr" && "Passer"}
            {lang === "de" && "Passe "}
          </div>
        </button>
      )}
      {numPlacedTiles > 0 && (
        <button onClick={handleClickConfirmMove}>
          <div className="button__text">
            <img className="button__icon" src={confirm} />
            {lang === "en" && "Confirm"}
            {lang === "tr" && "Onayla"}
            {lang === "fr" && "Confirmer"}
            {lang === "de" && "Bestätigen "}
          </div>
        </button>
      )}
      <button onClick={handleClickResign}>
        <div className="button__text">
          <img className="button__icon" src={resign} />
          {lang === "en" && "Resign"}
          {lang === "tr" && "Teslim ol"}
          {lang === "fr" && "Céder à"}
          {lang === "de" && "Gib auf "}
        </div>
      </button>
    </div>
  );
};

export default GameButtons;
