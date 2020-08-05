import React from "react";
import "../styles/GameButtons.css";

const ExchangeTilesButtons = ({
  handleCancelExchange,
  handleConfirmExchange,
}) => {
  return (
    <div className="gameButtons__wrapper">
      <button
        className="button__cancel button__exchange"
        onClick={handleCancelExchange}
      >
        <div className="">Cancel</div>
      </button>
      <button
        className="button__confirm button__exchange"
        onClick={handleConfirmExchange}
      >
        <div className="">Confirm</div>
      </button>
    </div>
  );
};

export default ExchangeTilesButtons;
