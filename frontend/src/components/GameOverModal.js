import React from "react";
import "../styles/GameOverModal.css";
import { Fade, Bounce } from "react-awesome-reveal";

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
}) => {
  let result = "";
  const opponentName = gameMode === "Online" ? invitedPlayer.name : "SkrablBot";
  const playerName = gameMode === "Online" ? user.name : "Player";
  const hsw = highestScoringWord.word.toUpperCase();

  if (currentPlayer == 0) {
    var playerScore = scores[0];
    var opponentScore = scores[1];
    // playerScore = scores[currentPlayer];
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
          ? `${opponentName} wins by default!`
          : `${playerName} wins by default!`;
      break;

    case outcome === "TimeOut":
      result =
        endedBy === currentPlayer
          ? `${playerName} ran out of time!`
          : `${opponentName} ran out of time!`;
      break;

    case playerScore > opponentScore:
      result = `${playerName} wins!`;
      break;

    case playerScore < opponentScore:
      result = `${opponentName} wins!`;
      break;

    default:
      result = "It's a draw!";
      break;
  }

  return (
    <Fade triggerOnce className="gameOverModal__wrapper">
      <Bounce
        triggerOnce
        cascade
        damping={0.5}
        className="gameOverModal__content"
      >
        <h2>{result}</h2>
        {outcome === "TimeOut" && <p>(-50pts)</p>}
        <h3>Scores</h3>
        <p>
          {playerName}: &nbsp;&nbsp;{playerScore}pts
        </p>
        <p>
          {opponentName}: &nbsp;&nbsp;{opponentScore}pts
        </p>
        <h4>Highest scoring word</h4>
        <p>
          '{hsw}': &nbsp;&nbsp; {highestScoringWord.points}pts{" "}
        </p>
        <p>{`(${
          highestScoringWord.player === 0 ? playerName : opponentName
        })`}</p>
        <button onClick={returnToHomeScreen}>OK</button>
      </Bounce>
    </Fade>
  );
};

export default GameOverModal;
/*<p>CurrentPlayer: {currentPlayer}</p>
        <p>Outcome: {outcome}</p>
        <p>playerName: {playerName}</p>
        <p>playerScore: {playerScore}</p>
        <p>opponentName: {opponentName}</p>
        <p>opponentScore: {opponentScore}</p>*/
