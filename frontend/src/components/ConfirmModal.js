import React from "react";
import "../styles/ConfirmModal.css";
import { Fade } from "react-awesome-reveal";
import {printWordWithBlankTiles} from "../utils/printWordWithBlankTiles"

const ConfirmModal = ({
  message,
  handleResign,
  handlePass,
  handleConfirmMove,
  closeModal,
  turnWords,
  setTurnWords
}) => {
  let confirmFunction;
  let words= []
  message.type === "resign"
    ? (confirmFunction = handleResign)
    : (confirmFunction = handlePass);

  switch (message.type) {
    case "resign":
      confirmFunction = handleResign;
      break;

    case "pass":
      confirmFunction = handlePass;
      break;

    case "confirm":
      confirmFunction = handleConfirmMove;
      break;
    
    case "blankTile":
      words = printWordWithBlankTiles(turnWords)
      confirmFunction = closeModal;
      break;

    default:
      return;
  }

  printWordWithBlankTiles(turnWords)
  
  return (
    <Fade triggerOnce className="confirmModal__wrapper">
      <div className="confirmModal__content">
        <p>{message.message}</p>
        {message.type === "blankTile" &&
          words.map((word, index) => <p key={index} >{word}</p>)
  
      }
        <div className="confirmModal__buttons">
          <button className="button__confirm" onClick={confirmFunction}>
            Confirm
          </button>
          <button className="button__cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </Fade>
  );
};

export default ConfirmModal;
