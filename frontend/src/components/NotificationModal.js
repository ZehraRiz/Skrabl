import React from "react";
import "../styles/NotificationModal.css";

const NotificationModal = ({ notification, handleCloseModal }) => {
  return (
    <div className="notificationModal__wrapper">
      <div className="notificationModal__content">
        <p>{notification}</p>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default NotificationModal;
