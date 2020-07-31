import React from "react";
import "../styles/GameButtons.css";

const ExchangeTilesButtons = ({
  handleCancelExchange,
  handleConfirmExchange,
}) => {
  return (
    <div className="gameButtons__wrapper">
      <button
        className="button__cancel"
        onClick={handleCancelExchange}
      >
        <div className="button__text">Cancel</div>
      </button>
      <button
        className="button__confirm"
        onClick={handleConfirmExchange}
      >
        <div className="button__text">Confirm</div>
      </button>
    </div>
  );
};

export default ExchangeTilesButtons;
