import React from "react";
import "../styles/MenuModal.css";
import { Fade } from "react-awesome-reveal";

const MenuModal = ({
  closeModal,
  handleClickRules,
  handleClickSound,
  handleClickAbout,
  mute,
  lang,
}) => {
  return (
    <Fade triggerOnce className="menuModal__wrapper">
      <div className="menuModal__content">
        <h2>
          {lang === "en" && "Menu"}
          {lang === "tr" && "Menü"}
          {lang === "fr" && "Menu"}
          {lang === "de" && "Speisekarte"}
        </h2>
        <button onClick={handleClickRules}>
          {lang === "en" && "Rules"}
          {lang === "tr" && "Kurallar"}
          {lang === "fr" && "Règles"}
          {lang === "de" && "Regeln"}
        </button>
        <button onClick={handleClickSound}>
          {lang === "en" && (mute ? "Sound Off" : "Sound On")}
          {lang === "tr" && (mute ? "Sesi Kapamak" : "Ses Açık")}
          {lang === "fr" && (mute ? "Son Éteint" : "Son Sur")}
          {lang === "de" && (mute ? "Ton Aus" : "Ton An")}
        </button>
        <button onClick={handleClickAbout}>
          {lang === "en" && "About"}
          {lang === "tr" && "Hakkında"}
          {lang === "fr" && "À Propos"}
          {lang === "de" && "Über"}
        </button>
        <button onClick={closeModal}>
          {lang === "en" && "Close"}
          {lang === "tr" && "Kapat"}
          {lang === "fr" && "Ferme "}
          {lang === "de" && "Schließen"}
        </button>
      </div>
    </Fade>
  );
};

export default MenuModal;
