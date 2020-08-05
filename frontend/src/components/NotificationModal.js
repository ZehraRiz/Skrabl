import React from "react";
import "../styles/NotificationModal.css";
import { Fade } from "react-awesome-reveal";

const NotificationModal = ({
  notification,
  handleCloseNotificationModal,
  lang,
}) => {
  return (
    <Fade triggerOnce className="notificationModal__wrapper">
      <div className="notificationModal__content">
        <p>{notification}</p>
        <button onClick={handleCloseNotificationModal}>
          {lang === "en" && "Close"}
          {lang === "tr" && "Kapat"}
          {lang === "fr" && "Ferme "}
          {lang === "de" && "schließen"}
        </button>
      </div>
    </Fade>
  );
};

export default NotificationModal;
