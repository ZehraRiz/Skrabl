import React from "react";
import "../styles/MenuModal.css";
import { Fade } from "react-awesome-reveal";

const MenuModal = ({
  closeModal,
  handleClickRules,
  handleClickSound,
  mute,
  lang,
}) => {
  return (
    <Fade triggerOnce className="menuModal__wrapper">
      <div className="menuModal__content">
          <h2>Menu</h2>
          <button onClick={handleClickRules}>Rules</button>
          <button onClick={handleClickSound}>{mute ? 'Sounds Off' : 'Sounds On'}</button>
          <button onClick={null}>About</button>
        <button onClick={closeModal}>
          {lang === "en" && "Close"}
          {lang === "tr" && "Kapat"}
          {lang === "fr" && "Ferme "}
          {lang === "de" && "schließen"}
        </button>
      </div>
    </Fade>
  );
};

export default MenuModal;
