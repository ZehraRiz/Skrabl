import React from "react";
import "../styles/GameButtons.css";

const ExchangeTilesButtons = ({
  handleCancelExchange,
  handleConfirmExchange,
}) => {
  return (
    <div className="gameButtons__wrapper">
      <button className="button__cancel" onClick={handleCancelExchange}>
        Cancel
      </button>
      <button className="button__confirm" onClick={handleConfirmExchange}>
        Confirm
      </button>
    </div>
  );
};

export default ExchangeTilesButtons;
