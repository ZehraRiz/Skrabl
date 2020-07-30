import React from "react";
import "../styles/Welcome.css";
import { Fade } from "react-awesome-reveal";
import uk from "../images/ukflag.svg";
import de from "../images/deflag.svg";
import fr from "../images/frflag.svg";
import tk from "../images/tkflag.svg";

const WelcomeScreen = ({
  setCurrentComponent,
  handleChooseComputer,
  handleChooseOnline,
}) => {
  return (
    <Fade triggerOnce>
      <div className="welcome__main">
        <div className="welcome__menu">
          <h2>Select game type...</h2>
            <button onClick={handleChooseComputer}>
              <span>Player</span><span className="vs">VS</span><span>SkrablBot</span>
            </button>
            <button onClick={handleChooseOnline}>
            <span>Player</span><span className="vs">VS</span><span>Player</span>
            </button>
        </div>
        <div className="language__select">
          <img className="language__icon" src={uk} />
          <img className="language__icon" src={de} />
          <img className="language__icon" src={fr} />
          <img className="language__icon" src={tk} />
        </div>
      </div>
    </Fade>
  );
};

export default WelcomeScreen;
