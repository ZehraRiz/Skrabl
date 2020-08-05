import React from "react";
import "../styles/GameButtons.css";

const ExchangeTilesButtons = ({
  handleCancelExchange,
  handleConfirmExchange,
  lang,
}) => {
  return (
    <div className="gameButtons__wrapper">
      <button
        className="button__cancel button__exchange"
        onClick={handleCancelExchange}
      >
        <div className="">
          {lang === "en" && "Cancel"}
          {lang === "tr" && "Iptal"}
          {lang === "fr" && "Annuler"}
          {lang === "de" && "Stornieren "}
        </div>
      </button>
      <button
        className="button__confirm button__exchange"
        onClick={handleConfirmExchange}
      >
        <div className="">
          {lang === "en" && "Confirm"}
          {lang === "tr" && "Onayla"}
          {lang === "fr" && "Confirmer"}
          {lang === "de" && "Bestätigen "}
        </div>
      </button>
    </div>
  );
};

export default ExchangeTilesButtons;
