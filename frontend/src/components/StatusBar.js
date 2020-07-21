import React from "react";
import Timer from "./Timer";
import "../styles/StatusBar.css";

const StatusBar = ({ scores, gameInProgress, setNotification }) => {
  return (
    <div className="statusBar__wrapper">
      <div className="statusBar__player">
        Player 1: {scores.player1}
        <Timer
          gameInProgress={gameInProgress}
          setNotification={setNotification}
        />
      </div>
      <div className="statusBar__player">
        Player 2: {scores.player2}
        <Timer
          gameInProgress={gameInProgress}
          setNotification={setNotification}
        />
      </div>
    </div>
  );
};

export default StatusBar;
