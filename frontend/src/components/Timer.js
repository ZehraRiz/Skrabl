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

   useEffect(() => {
    if (currentPlayer === turn) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1/60);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft, turn]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(interval);
      setNotification("Time's up");
    }
  }, [timeLeft]);
  return (
    <div className="timer__wrapper">
      Time: {formatMilliseconds(timeLeft*60*1000)}
    </div>
  );
};

export default Timer;
