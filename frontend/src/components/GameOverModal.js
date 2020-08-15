import React from "react";
import "../styles/GameOverModal.css";
import { Fade, Bounce } from "react-awesome-reveal";
import { notifications } from "../assets/notifications";

const GameOverModal = ({
  scores,
  highestScoringWord,
  returnToHomeScreen,
  currentPlayer,
  user,
  invitedPlayer,
  gameMode,
  outcome,
  endedBy,
  lang,
}) => {
  let playerText;
  if (lang === "en") {
    playerText = "Player";
  } else if (lang === "tr") {
    playerText = "Oyuncu";
  } else if (lang === "fr") {
    playerText = "Joueur";
  } else if (lang === "de") {
    playerText = "Spieler";
  }
  let result = "";
  const opponentName = gameMode === "Online" ? invitedPlayer.name : "SkrablBot";
  const playerName = gameMode === "Online" ? user.name : playerText;
  const hsw = highestScoringWord.word.toUpperCase();

  if (currentPlayer == 0) {
    var playerScore = scores[0];
    var opponentScore = scores[1];
  } else {
    var playerScore = scores[1];
    var opponentScore = scores[0];
  }

  if (outcome === "TimeOut") {
    if (endedBy === currentPlayer) {
      playerScore -= 50;
    } else opponentScore -= 50;
  }

  switch (true) {
    case outcome === "Resign":
      result =
        endedBy === currentPlayer
          ? `${opponentName} ${notifications["wins by default!"][lang]}`
          : `${playerName} ${notifications["wins by default!"][lang]}`;
      break;
 
    case outcome === "TimeOut":
      result =
        endedBy === currentPlayer
          ? `${playerName} ${notifications["ran out of time!"][lang]}`
          : `${opponentName} ${notifications["ran out of time!"][lang]}`;
      break;

    case playerScore > opponentScore:
      result = `${playerName} ${notifications["wins!"][lang]}`;
      break;

    case playerScore < opponentScore:
      result = `${opponentName} ${notifications["wins!"][lang]}`;
      break;

    default:
      result = notifications["It's a draw!"][lang];
      break;
  }

  return (
    <Fade className="gameOverModal__wrapper">
      <Bounce cascade damping={0.5} className="gameOverModal__content">
        <h2>{result}</h2>
        <p>{outcome === "TimeOut" && "(-50pts)"}</p>
        <h3>
          {lang === "en" && "Scores"}
          {lang === "tr" && "Skorlar"}
          {lang === "fr" && "Scores"}
          {lang === "de" && "Punktestand"}
        </h3>
        <p>
          {playerName}: &nbsp;&nbsp;{playerScore}pts
        </p>
        <p>
          {opponentName}: &nbsp;&nbsp;{opponentScore}pts
        </p>
        <div
          className={`gameOverModal__hsw ${
            hsw === "" ? "gameOverModal__hsw--hidden" : ""
          }`}
        >
          <h4>
            {lang === "en" && "Highest scoring word"}
            {lang === "tr" && "En yüksek puan alan kelime"}
            {lang === "fr" && "Mot ayant obtenu le meilleur score"}
            {lang === "de" && "Wort mit der höchsten Punktzahl"}
          </h4>
          <p>
            '{hsw}': &nbsp;&nbsp; {highestScoringWord.points}{" "}
            {lang === "en" && "points"}
            {lang === "tr" && "puan"}
            {lang === "fr" && "points"}
            {lang === "de" && "Punkte"}{" "}
          </p>
          <p>{`(${
            highestScoringWord.player === 0 ? playerName : opponentName
          })`}</p>
        </div>
        <button onClick={returnToHomeScreen}>OK</button>
      </Bounce>
    </Fade>
  );
};

export default GameOverModal;
