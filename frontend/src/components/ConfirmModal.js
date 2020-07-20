import React from "react";
import "../styles/ConfirmModal.css";

const ConfirmModal = ({ message, handleConfirm, handleCancel }) => {
  return (
    <div className="confirmModal__wrapper">
      <div className="confirmModal__content">
        <p>{message}</p>
        <div className="confirmModal__buttons">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
