import React from "react";
import "../styles/GameOverModal.css";
import {Fade, Bounce} from "react-awesome-reveal";

const GameOverModal = ({
  scores,
  exitGame,
  currentPlayer,
  user,
  invitedPlayer,
  gameMode
}) => {

  let result = 0;
  const opponent = gameMode === "Online" ? invitedPlayer.id : "SkrablBot";

  switch(true) {
    case (scores[0] > scores[1]):
      result = `${user.name} wins!`;
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
        <h3>Scores:</h3>
        <p>Player 0: {scores[0]}</p>
        <p>Player 1: {scores[1]}</p>
        <h4>Highest scoring word:</h4>

        <button onClick={exitGame}>OK</button>
      </Bounce>
    </Fade>
  );
};

export default GameOverModal;
