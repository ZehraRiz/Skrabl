import React from "react";
import "../styles/GameButtons.css";

const ExchangeTilesButtons = ({
    handleCancelExchange,
    handleConfirmExchange
}) => {
  return (
    <div className="gameButtons__wrapper">
      <button onClick={handleCancelExchange}>Cancel</button>
      <button onClick={handleConfirmExchange}>Confirm</button>
    </div>
  );
};

export default ExchangeTilesButtons;
