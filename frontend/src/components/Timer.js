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
  const [playerTime, setPlayerTime] = useState(timeLeft);

    useEffect(() => {
    setPlayerTime(timeLeft)
  }, [timeLeft])

  // useEffect(() => {
  //     if(playerTime< 20)
  //   setTimeLeft(playerTime);
  // }, [turn]);

  useEffect(() => {
    if (currentPlayer === turn) {
      interval = setInterval(() => {
        setPlayerTime(playerTime - 1 / 60);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [turn, playerTime]);



  useEffect(() => {
    if (playerTime < 0.01) {
      handleTimeOut();
      clearInterval(interval);
    }
    if (playerTime < 1) {
      console.log(playerTime)
      handleTimeWarning();
    }
  }, [playerTime]);

  return (
    <div className="timer__wrapper">
      {lang === "en" && "Time:"}
      {lang === "tr" && "Süre:"}
      {lang === "fr" && "Temps:"}
      {lang === "de" && "Zeit:"}&nbsp;&nbsp;&nbsp;&nbsp;
      <div className={timeWarning ? "timer__time warning" : "timer__time"}>
        {formatMilliseconds(playerTime * 60 * 1000)}
      </div>
    </div>
  );
};

export default Timer;
