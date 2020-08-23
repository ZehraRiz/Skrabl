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
  handleTimeWarning,
  lang,
}) => {
  const aiTiles = computerRackTiles.map((tile) => {
    return (
      <div key={tile.id} className="aiTile">
        {tile.letter.toUpperCase()}
      </div>
    );
  });
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
              <h3>
                {lang === "en" && "SkrablBot's tiles"}
                {lang === "tr" && "SkrablBot'un harf taşları"}
                {lang === "fr" && "Pions de SkrablBot"}
                {lang === "de" && "SkrablBots Buchstabensteine"}
              </h3>
              <div className="aiRack">{aiTiles}</div>
            </div>
          )}
          {gameMode === "Online" && (
            <div className="rackInfo">
              <h3>
                {lang === "en" && "Highest scoring word"}
                {lang === "tr" && "En yüksek puan alan kelime"}
                {lang === "fr" && "Mot ayant obtenu le meilleur score"}
                {lang === "de" && "Wort mit der höchsten Punktzahl"}
              </h3>
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
            {gameMode === "Computer" && lang === "en" && "Player"}
            {gameMode === "Computer" && lang === "tr" && "Oyuncu"}
            {gameMode === "Computer" && lang === "fr" && "Joueur"}
            {gameMode === "Computer" && lang === "de" && "Spieler"}
            {gameMode === "Online" && user.name}
          </div>
          <div className="player__time">
            <Timer
              timeLeft={timeLeftPlayer}
              setTimeLeft={setTimeLeftPlayer}
              currentPlayer={currentPlayer}
              turn={turn}
              handleTimeOut={handleTimeOut}
              handleTimeWarning={handleTimeWarning}
              timeWarning={timeWarning}
              lang={lang}
            />
          </div>

          <div className="player__score">
            {lang === "en" && "Score:"}
            {lang === "tr" && "Skor:"}
            {lang === "fr" && "Score:"}
            {lang === "de" && "Punktzahl:"}&nbsp;&nbsp;&nbsp;{" "}
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
              handleTimeOut={handleTimeOut}
              handleTimeWarning={handleTimeWarning}
              timeWarning={timeWarning}
              lang={lang}
            />
          </div>
          <div className="player__score">
            {lang === "en" && "Score:"}
            {lang === "tr" && "Skor:"}
            {lang === "fr" && "Score:"}
            {lang === "de" && "Punktzahl:"}&nbsp;&nbsp;&nbsp;{" "}
            {scores && scores[currentPlayer == 1 ? 0 : 1]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
