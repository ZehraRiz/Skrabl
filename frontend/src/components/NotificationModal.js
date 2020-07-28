import React from "react";
import "../styles/NotificationModal.css";
import { Fade } from "react-awesome-reveal";

const NotificationModal = ({ notification, handleCloseNotificationModal }) => {
  return (
    <div className="notificationModal__wrapper">
      <Fade triggerOnce>
        <div className="notificationModal__content">
          <p>{notification}</p>
          <button onClick={handleCloseNotificationModal}>Close</button>
        </div>
      </Fade>
    </div>
  );
};

export default NotificationModal;
