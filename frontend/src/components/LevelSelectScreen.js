import React from "react";
import "../styles/LevelSelectScreen.css";
import { Fade } from "react-awesome-reveal";

const LevelSelectScreen = ({
  handleStart,
  handleChooseEasy,
  handleChooseNormal,
  handleChooseHard,
  lang,
}) => {
  return (
    <Fade triggerOnce>
      <div className="levelSelect__main">
        <div className="levelSelect__menu">
          <h2>
            {lang === "en" && "Select level..."}
            {lang === "tr" && "Seviye seç..."}
            {lang === "fr" && "Choisir le niveau..."}
            {lang === "de" && "Stufe auswählen..."}
          </h2>
          <button onClick={handleChooseEasy}>
            {lang === "en" && "Easy"}
            {lang === "tr" && "Kolay"}
            {lang === "fr" && "Facile"}
            {lang === "de" && "Einfach"}
          </button>
          <button onClick={handleChooseNormal}>
            {lang === "en" && "Normal"}
            {lang === "tr" && "Normal"}
            {lang === "fr" && "Normal"}
            {lang === "de" && "Normal"}
          </button>
          <button onClick={handleChooseHard}>
            {lang === "en" && "Hard"}
            {lang === "tr" && "Zor"}
            {lang === "fr" && "Dur"}
            {lang === "de" && "Schwer"}
          </button>
        </div>
        <button onClick={handleStart}>
          {lang === "en" && "Back"}
          {lang === "tr" && "Geri git"}
          {lang === "fr" && "Retourner"}
          {lang === "de" && "Geh zurück"}
        </button>
      </div>
    </Fade>
  );
};

export default LevelSelectScreen;
