import React from "react";
import "../styles/Welcome.css";

const WelcomeScreen = ({
  setCurrentComponent,
  handleChooseComputer,
  handleChooseOnline,
}) => {
  return (
    <div className="welcome__main">
      <div className="welcome__menu">
        <h2>Welcome to Skrabl!</h2>
          <button onClick={handleChooseComputer}>
            Play against the Skrabl A.I
          </button>
          <button onClick={handleChooseOnline}>
            Play against someone online
          </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
