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
}) => {
  return (
    <div className="statusBar__wrapper">
      <div className="statusBar__player">
        Player 1: {scores.player1}
        <Timer
          setNotification={setNotification}
          timeLeft={timeLeftPlayer}
          setTimeLeft={setTimeLeftPlayer}
          currentPlayer={currentPlayer}
          playerIndex={0}
        />
      </div>
      <div className="statusBar__player">
        Player 2: {scores.player2}
        <Timer
          setNotification={setNotification}
          timeLeft={timeLeftOpponent}
          setTimeLeft={setTimeLeftOpponent}
          currentPlayer={currentPlayer}
          playerIndex={1}
        />
      </div>
    </div>
  );
};

export default StatusBar;
