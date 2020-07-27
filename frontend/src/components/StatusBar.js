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
  turn,
  gameMode,
}) => {
  return (
    <div className="statusBar__wrapper">
      <div className="statusBar__player">
        Player 1: {scores && scores[0]}
        {gameMode === "Computer" && turn === 1 && <span> (thinking...)</span>}
        <Timer
          setNotification={setNotification}
          timeLeft={timeLeftPlayer}
          setTimeLeft={setTimeLeftPlayer}
          currentPlayer={currentPlayer}
        />
      </div>
      <div className="statusBar__player">
        Player 2: {scores && scores[1]}
        <Timer
          setNotification={setNotification}
          timeLeft={timeLeftOpponent}
          setTimeLeft={setTimeLeftOpponent}
          currentPlayer={currentPlayer}
        />
      </div>
      {turn===currentPlayer? <h3>Your Move...</h3> : <h6>Opponent's Move...</h6>}
    </div>
  );
};

export default StatusBar;
