import React from "react";
import "../styles/Welcome.css";
import { Fade } from "react-awesome-reveal";

const WelcomeScreen = ({
  setCurrentComponent,
  handleChooseComputer,
  handleChooseOnline,
}) => {
  return (
    <Fade triggerOnce>
      <div className="welcome__main">
        <div className="welcome__menu">
          <h2>Welcome to Skrabl!</h2>
            <button onClick={handleChooseComputer}>
              <span>Player</span><span className="vs">VS</span><span>SkrablBot</span>
            </button>
            <button onClick={handleChooseOnline}>
            <span>Player</span><span className="vs">VS</span><span>Player</span>
            </button>
        </div>
      </div>
    </Fade>
  );
};

export default WelcomeScreen;
