import React, { useEffect, useState } from "react";
import { formatMilliseconds } from "../utils/formatMilliseconds";
import "../styles/Timer.css";

const Timer = ({
  setNotification,
  timeLeft,
  setTimeLeft,
  currentPlayer,
  turn
}) => {
  let interval;

  console.log(timeLeft)
  useEffect(() => {
    
    if (currentPlayer == turn) {
    const interval = setInterval(() => {
      setTimeLeft(timeLeft => timeLeft - 1/60);
    }, 1000);
    return () => clearInterval(interval);}
  }, [currentPlayer, timeLeft, setTimeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(interval);
      setNotification("Time's up");
    }
  }, [timeLeft, currentPlayer, setTimeLeft]);

  return (
    <div className="timer__wrapper">
      Time: {formatMilliseconds(timeLeft*60*1000)}
    </div>
  );
};

export default Timer;
