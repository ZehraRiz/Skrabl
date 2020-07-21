import React from "react";
import "../styles/NotificationModal.css";

const NotificationModal = ({ notification, handleCloseNotificationModal }) => {
  return (
    <div className="notificationModal__wrapper">
      <div className="notificationModal__content">
        <p>{notification}</p>
        <button onClick={handleCloseNotificationModal}>Close</button>
      </div>
    </div>
  );
};

export default NotificationModal;
