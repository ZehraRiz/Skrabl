import React from "react";
import Timer from "./Timer";
import "../styles/StatusBar.css";
import Pouch from "../images/pouch.svg";

const StatusBar = ({
  computerRackTiles,
  pouch,
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
  const aiTiles = computerRackTiles.map(tile => {
    return <div key={tile.id} className="aiTile">{tile.letter.toUpperCase()}</div>
  });
  return (
    <div className="statusBar__frame">
      <div className="statusBar__wrapper">
        <div className="statusBar__reverse">
          <div className="pouchInfo">
            <h3>{pouch.length} tiles remaining in pouch</h3>
            <img className="pouchIcon" src={Pouch} />
          </div>
          <div className="rackInfo">
          <h3>SkrablBot tiles</h3>
            <div className="aiRack">{aiTiles}</div> 
          </div>
        </div>
        <div
          className={
            turn === currentPlayer
              ? "statusBar__player player__active"
              : "statusBar__player"
          }
        >
          <div className="player__name">
            {gameMode === "Computer" ? "Player" : user.name} {}
          </div>
          <div className="player__time">
            <Timer
              setNotification={setNotification}
              timeLeft={timeLeftPlayer}
              setTimeLeft={setTimeLeftPlayer}
              currentPlayer={currentPlayer}
              turn={turn}
            />
          </div>

          <div className="player__score">
            Score:&nbsp;&nbsp;&nbsp;{" "}
            {scores && scores[currentPlayer == 1 ? 1 : 0]}
          </div>
        </div>
        <div
          className={
            turn !== currentPlayer
              ? "statusBar__player opponent__active"
              : "statusBar__player"
          }
        >
          <div className="player__name">
            {gameMode === "Computer" && "SkrablBot"}
            {gameMode === "Online" && invitedPlayer && invitedPlayer.name}
          </div>
          <div className="player__time">
            <Timer
              setNotification={setNotification}
              timeLeft={timeLeftOpponent}
              setTimeLeft={setTimeLeftOpponent}
              currentPlayer={currentPlayer == 1 ? 0 : 1}
              turn={turn}
            />
          </div>
          <div className="player__score">
            Score:&nbsp;&nbsp;&nbsp;{" "}
            {scores && scores[currentPlayer == 1 ? 0 : 1]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
