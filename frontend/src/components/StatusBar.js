import React from "react";
import Timer from "./Timer";
import "../styles/StatusBar.css";
import Pouch from "../images/pouch.svg";

const StatusBar = ({
  highestScoringWord,
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
  timeOut,
  handleTimeOut,
  timeWarning,
  handleTimeWarning
}) => {
  const aiTiles = computerRackTiles.map((tile) => {
    return (
      <div key={tile.id} className="aiTile">
        {tile.letter.toUpperCase()}
      </div>
    );
  });

  console.log(timeLeftPlayer);
  return (
    <div className="statusBar__frame">
      <div className="statusBar__wrapper">
        <div className="statusBar__reverse">
          <div className="pouchInfo">
            <div className="pouch">
              <img className="pouchIcon" src={Pouch} />
              <div className="tileCounter">{pouch.length}</div>
            </div>
          </div>
          {gameMode === "Computer" && (
            <div className="rackInfo">
              <h3>SkrablBot tiles</h3>
              <div className="aiRack">{aiTiles}</div>
            </div>
          )}
          {gameMode === "Online" && (
            <div className="rackInfo">
              <h3>Highest scoring word</h3>
              {highestScoringWord.word.length > 0 && (
                <div className="hiScore">{`'${highestScoringWord.word.toUpperCase()}' - ${
                  highestScoringWord.points
                }pts`}</div>
              )}
              {highestScoringWord.word.length === 0 && (
                <div className="hiScore">{`...`}</div>
              )}
            </div>
          )}
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
          <div className="player__time" >
            <Timer
              setNotification={setNotification}
              timeLeft={timeLeftPlayer}
              setTimeLeft={setTimeLeftPlayer}
              currentPlayer={currentPlayer}
              turn={turn}
              timeOut={timeOut}
              handleTimeOut={handleTimeOut}
              handleTimeWarning={handleTimeWarning}
              timeWarning={timeWarning}
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
