import React, { useEffect, useState } from "react";
import { formatMilliseconds } from "../utils/formatMilliseconds";
import "../styles/Timer.css";

const Timer = ({
  timeLeft,
  setTimeLeft,
  currentPlayer,
  turn,
  handleTimeOut,
  handleTimeWarning,
  timeWarning,
  lang,
}) => {
  let interval;
 

  useEffect(() => {
    if (currentPlayer === turn) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft- 1 / 60);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft, turn]);



  useEffect(() => {
    if (timeLeft < 0.01) {
      handleTimeOut();
      clearInterval(interval);
    }
    if (timeLeft< 1) {
      handleTimeWarning();
    }
  }, [timeLeft]);

  return (
    <div className="timer__wrapper">
      {lang === "en" && "Time:"}
      {lang === "tr" && "Süre:"}
      {lang === "fr" && "Temps:"}
      {lang === "de" && "Zeit:"}&nbsp;&nbsp;&nbsp;&nbsp;
      <div className={timeWarning ? "timer__time warning" : "timer__time"}>
        {formatMilliseconds(timeLeft * 60 * 1000)}
      </div>
    </div>
  );
};

export default Timer;
