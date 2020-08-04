import React from "react";
import "../styles/LevelSelectScreen.css";
import { Fade } from "react-awesome-reveal";

const LevelSelectScreen = ({
    handleStart,
    handleChooseEasy,
    handleChooseNormal,
    handleChooseHard
  }) => {
    return (
      <Fade triggerOnce>
        <div className="levelSelect__main">
          <div className="levelSelect__menu">
            <h2>Select difficulty level...</h2>
            <button onClick={handleChooseEasy}>
              Easy
            </button>
            <button onClick={handleChooseNormal}>
              Normal
            </button>
            <button onClick={handleChooseHard}>
              Hard
            </button>
          </div>
          <button onClick={handleStart}>
              Back
          </button>
        </div>
      </Fade>
    );
  };
  
  export default LevelSelectScreen;