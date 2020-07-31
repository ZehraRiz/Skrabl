import React from "react";
import "../styles/GameOverModal.css";
import {Fade, Bounce} from "react-awesome-reveal";

const GameOverModal = ({
  scores,
  highestScoringWord,
  exitGame,
  currentPlayer,
  user,
  invitedPlayer,
  gameMode
}) => {

  let result = 0;
  const opponent = gameMode === "Online" ? invitedPlayer.id : "SkrablBot";
  const player = gameMode === "Online" ? user.name : "Player";
  const hsw = highestScoringWord.word.toUpperCase();

  switch(true) {
    case (scores[0] > scores[1]):
      result = `${player} wins!`;
      break;

    case (scores[0] < scores[1]):
     result = `${opponent} wins!`
      break;

    default:
      result = "It's a draw!";
      break;
  }


  return (
    <Fade className="gameOverModal__wrapper">
      <Bounce cascade damping={0.5} className="gameOverModal__content">
        <h2>{result}</h2>
        <h3>Scores</h3>
        <p>{player}: &nbsp;&nbsp;{scores[currentPlayer == 1 ? 1 : 0]}pts</p>
        <p>{opponent}: &nbsp;&nbsp;{scores[currentPlayer == 1 ? 0 : 1]}pts</p>
        <h4>Highest scoring word</h4>
        <p>'{hsw}': &nbsp;&nbsp; {highestScoringWord.points}pts </p>
        <button onClick={exitGame}>OK</button>
      </Bounce>
    </Fade>
  );
};

export default GameOverModal;
