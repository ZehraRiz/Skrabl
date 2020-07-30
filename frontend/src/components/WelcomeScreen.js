import React from "react";
import "../styles/Welcome.css";
import { Fade } from "react-awesome-reveal";
import en from "../images/ukflag.svg";
import de from "../images/deflag.svg";
import fr from "../images/frflag.svg";
import tr from "../images/tkflag.svg";

const WelcomeScreen = ({
  handleChooseComputer,
  handleChooseOnline,
  handleSetLang,
}) => {
  return (
    <Fade triggerOnce>
      <div className="welcome__main">
        <div className="welcome__menu">
          <h2>Select game type...</h2>
          <button onClick={handleChooseComputer}>
            <span>Player</span>
            <span className="vs">VS</span>
            <span>SkrablBot</span>
          </button>
          <button onClick={handleChooseOnline}>
            <span>Player</span>
            <span className="vs">VS</span>
            <span>Player</span>
          </button>
        </div>
        <div className="language__select">
          <div /*onClick={handleSetLang("en")}*/ >
            <img className="language__icon" src={en} />
          </div>
          <div /*onClick={handleSetLang("de")}*/ >
            <img className="language__icon" src={de} />
          </div>
          <div /*onClick={handleSetLang("fr")} */>
            <img className="language__icon" src={fr} />
          </div>
          <div /*onClick={handleSetLang("tr")} */>
            <img className="language__icon" src={tr} />
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default WelcomeScreen;
