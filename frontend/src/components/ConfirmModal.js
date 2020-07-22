import React from "react";
import "../styles/ConfirmModal.css";

const ConfirmModal = ({ message, handleResign, handlePass, closeModal }) => {
  let confirmFunction;
  message.type === "resign"
    ? (confirmFunction = handleResign)
    : (confirmFunction = handlePass);
  return (
    <div className="confirmModal__wrapper">
      <div className="confirmModal__content">
        <p>{message.message}</p>
        <div className="confirmModal__buttons">
          <button onClick={closeModal}>Cancel</button>
          <button onClick={confirmFunction}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
