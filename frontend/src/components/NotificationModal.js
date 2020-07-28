import React from "react";
import "../styles/NotificationModal.css";
import { Fade } from "react-awesome-reveal";

const NotificationModal = ({ notification, handleCloseNotificationModal }) => {
  return (
    <Fade triggerOnce>
      <div className="notificationModal__wrapper">
          <div className="notificationModal__content">
            <p>{notification}</p>
            <button onClick={handleCloseNotificationModal}>Close</button>
          </div>
      </div>
    </Fade>
  );
};

export default NotificationModal;
