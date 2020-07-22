import React, { useEffect, useState } from "react";
import { formatMilliseconds } from "../utils/formatMilliseconds";
import "../styles/Timer.css";

const Timer = ({
  setNotification,
  timeLeft,
  setTimeLeft,
  currentPlayer,
  currentPlayer,
}) => {
  let interval;

  // useEffect(() => {
  //   if (currentPlayer === currentPlayer) {
  //     interval = setInterval(() => {
  //       setTimeLeft(timeLeft - 1000);
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [timeLeft, currentPlayer]);

  // useEffect(() => {
  //   if (timeLeft === 0) {
  //     clearInterval(interval);
  //     setNotification("Time's up");
  //   }
  // }, [timeLeft]);

  return (
    <div className="timer__wrapper">
      Time left: {formatMilliseconds(timeLeft)}
    </div>
  );
};

export default Timer;
