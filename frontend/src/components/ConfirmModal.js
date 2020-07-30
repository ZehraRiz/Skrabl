import React from "react";
import "../styles/ConfirmModal.css";
import { Fade } from "react-awesome-reveal";

const ConfirmModal = ({
  message,
  handleResign,
  handlePass,
  handleConfirmMove,
  closeModal,
}) => {
  let confirmFunction;
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
  }
  return (
    <Fade triggerOnce className="confirmModal__wrapper">
      <div className="confirmModal__content">
        <p>{message.message}</p>
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
