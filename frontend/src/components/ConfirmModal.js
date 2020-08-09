import React, {useState} from "react";
import "../styles/ConfirmModal.css";
import { Fade } from "react-awesome-reveal";

const ConfirmModal = ({
  message,
  handleResign,
  handlePass,
  closeModal,
  setBlankTileLetter,
  lang
}) => {
  let confirmFunction;

  const [letter, setLetter]= useState("")

  // message.type === "resign"
  //   ? (confirmFunction = handleResign)
  //   : (confirmFunction = handlePass);

  const handleBlankTile = () => {
    if (letter === "") return;
    setBlankTileLetter(letter)
    closeModal();
  }


  switch (message.type) {
    case "resign":
      confirmFunction = handleResign;
      break;

    case "pass":
      confirmFunction = handlePass;
      break;

    case "blankTile":
      confirmFunction = handleBlankTile;
      break;
    
    default:
      return;
  }


  
  return (
    <div className="confirmModal__wrapper">
      <div className="confirmModal__content">
        <p>{message.message}</p>
        {message.type === "blankTile" && 
        <input maxLength={1} onChange={(e) => setLetter(e.target.value)}></input>
        }
        <div className="confirmModal__buttons">
          <button className="button__confirm" onClick={confirmFunction}>
            {lang === "en" && "Confirm"}
            {lang === "tr" && "Onayla"}
            {lang === "fr" && "Confirmer"}
            {lang === "de" && "Bestätigen "}
          </button>
          <button className="button__cancel" onClick={closeModal}>
            {lang === "en" && "Cancel"}
            {lang === "tr" && "Iptal"}
            {lang === "fr" && "Annuler"}
            {lang === "de" && "Stornieren "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
