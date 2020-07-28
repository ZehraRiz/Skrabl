import React from "react";
import Timer from "./Timer";
import "../styles/StatusBar.css";

const StatusBar = ({
  user,
  invitedPlayer,
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
  console.log("time left player: " + timeLeftPlayer)
  console.log("time left opponent: "+timeLeftOpponent)
  return (
    <div className="statusBar__wrapper">
      <div className={turn === currentPlayer ? "statusBar__player player__active" : "statusBar__player"}>
        <div class="player__name">{gameMode === "Computer" ? "Player" : user.name } {}</div>
        <div class="player__time">

          <Timer
            setNotification={setNotification}
            timeLeft={timeLeftPlayer}
            setTimeLeft={setTimeLeftPlayer}
            currentPlayer={currentPlayer}
            turn={turn}
          />
        </div>

        <div className="player__score">Score: {scores && scores[0]}</div>
      </div>
      <div
        className={
          turn !== currentPlayer
            ? "statusBar__player opponent__active"
            : "statusBar__player"
        }
      >
        <div className="player__name">
          {gameMode === "Computer" && "ScrabbleBot"}
          {gameMode === "Online" && invitedPlayer && invitedPlayer.name}
        </div>
        <div className="player__time">
          <Timer
            setNotification={setNotification}
            timeLeft={timeLeftOpponent}
            setTimeLeft={setTimeLeftOpponent}
            currentPlayer={(currentPlayer==0)? 1 : 0}
            turn={turn}
          />
        </div>
        <div class="player__score">Score: {scores && scores[1]}</div>
        <div class="player__thinking">{gameMode === "Computer" && turn === 1 && <span> (thinking...)</span>}</div>
       
      </div>
    </div>
  );
};

export default StatusBar;