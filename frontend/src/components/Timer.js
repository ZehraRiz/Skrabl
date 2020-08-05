import React, { useEffect, useState } from "react";
import { formatMilliseconds } from "../utils/formatMilliseconds";
import "../styles/Timer.css";

const Timer = ({
  setNotification,
  timeLeft,
  setTimeLeft,
  currentPlayer,
  turn,
  handleTimeOut,
  handleTimeWarning,
  timeWarning
}) => {
  let interval;
  const [playerTime, setPlayerTime] = useState(timeLeft)

   useEffect(() => {
    if (currentPlayer === turn) {
      interval = setInterval(() => {
        setPlayerTime(playerTime- 1/60);
      }, 1000);
      return () => clearInterval(interval);
    }
   }, [turn, playerTime]);
  
  useEffect(() => {
    setTimeLeft(playerTime)
  },[turn])

  useEffect(() => {
    if (playerTime < 0.01) {
      handleTimeOut();
      console.log('timeOut');
      clearInterval(interval);
      //setNotification("Time's up");
    }
    if (playerTime < 1) {
      handleTimeWarning();
    }
  }, [playerTime]);

  return (
    <div className="timer__wrapper">
      Time:&nbsp;&nbsp;&nbsp;&nbsp; <div className={timeWarning ? "timer__time warning" : "timer__time"}>{formatMilliseconds(playerTime*60*1000)}</div>
    </div>
  );
};

export default Timer;
