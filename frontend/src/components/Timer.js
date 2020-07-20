import React, { useEffect, useState } from "react";
import "../styles/Timer.css";

const Timer = ({ gameInProgress, setNotification }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  let interval;

  useEffect(() => {
    if (gameInProgress) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(interval);
      setNotification("Time's up");
    }
  }, [timeLeft]);

  return <div className="timer__wrapper">{timeLeft}</div>;
};

export default Timer;
