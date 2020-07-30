import React from "react";
import "../styles/TitleScreen.css";
import { Fade, Bounce } from "react-awesome-reveal";

const TitleScreen = ({ handleStart }) => {
  return (
    <Fade triggerOnce>
      <div className="title__main">
        <Bounce cascade damping={0.2} className="title__content">
          <h1>S</h1>
          <h1>k</h1>
          <h1>r</h1>
          <h1>a</h1>
          <h1>b</h1>
          <h1>l</h1>
        </Bounce>
        <Fade triggerOnce delay={2000}>
          <button onClick={handleStart} className="button__confirm">
            Let's go!
          </button>
        </Fade>
      </div>
    </Fade>
  );
};

export default TitleScreen;
