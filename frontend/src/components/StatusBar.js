import React from "react";
import Timer from "./Timer";
import "../styles/StatusBar.css";

const StatusBar = ({
  scores,
  setNotification,
  timeLeftPlayer,
  timeLeftOpponent,
  setTimeLeftPlayer,
  setTimeLeftOpponent,
  currentPlayer,
  turn
}) => {
  return (
    <div className="statusBar__wrapper">
      <div className="statusBar__player">
        Player 1: {scores[0]}
        <Timer
          setNotification={setNotification}
          timeLeft={timeLeftPlayer}
          setTimeLeft={setTimeLeftPlayer}
          currentPlayer={currentPlayer}
        />
      </div>
      <div className="statusBar__player">
        Player 2: {scores[1]}
        <Timer
          setNotification={setNotification}
          timeLeft={timeLeftOpponent}
          setTimeLeft={setTimeLeftOpponent}
          currentPlayer={currentPlayer}
        />
      </div>
      {turn===currentPlayer? <h3>Its your turn</h3> : <h6>Its the opponents turn</h6>}
    </div>
  );
};

export default StatusBar;
