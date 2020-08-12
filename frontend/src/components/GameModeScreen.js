import React from "react";
import "../styles/Welcome.css";
import { Fade } from "react-awesome-reveal";
import en from "../images/ukflag.svg";
import de from "../images/deflag.svg";
import fr from "../images/frflag.svg";
import tr from "../images/tkflag.svg";

const GameModeScreen = ({
  handleChooseComputer,
  handleChooseOnline,
  setLangEn,
  setLangFr,
  setLangDe,
  setLangTr,
  lang,
}) => {
  return (
    <Fade triggerOnce>
      <div className="welcome__main">
        <div className="welcome__menu">
          {lang === "en" && <h2>Select game mode...</h2>}
          {lang === "tr" && <h2>Oyun modunu seç...</h2>}
          {lang === "fr" && <h2>Sélectionnez le mode de jeu...</h2>}
          {lang === "de" && <h2>Wählen Sie den Spielmodus...</h2>}
          <button onClick={handleChooseComputer}>
            {lang === "en" && <span>Player</span>}
            {lang === "tr" && <span>Oyuncu</span>}
            {lang === "fr" && <span>Joueur</span>}
            {lang === "de" && <span>Spieler</span>}
            <span className="vs">VS</span>
            <span>SkrablBot</span>
          </button>
          <button onClick={handleChooseOnline}>
            {lang === "en" && <span>Player</span>}
            {lang === "tr" && <span>Oyuncu</span>}
            {lang === "fr" && <span>Joueur</span>}
            {lang === "de" && <span>Spieler</span>}
            <span className="vs">VS</span>
            {lang === "en" && <span>Player</span>}
            {lang === "tr" && <span>Oyuncu</span>}
            {lang === "fr" && <span>Joueur</span>}
            {lang === "de" && <span>Spieler</span>}
          </button>
        </div>
        <div className="language__select">
          <div onClick={setLangEn}>
            <img className="language__icon" src={en} />
          </div>
          <div onClick={setLangDe}>
            <img className="language__icon" src={de} />
          </div>
          <div onClick={setLangFr}>
            <img className="language__icon" src={fr} />
          </div>
          <div onClick={setLangTr}>
            <img className="language__icon" src={tr} />
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default GameModeScreen;
