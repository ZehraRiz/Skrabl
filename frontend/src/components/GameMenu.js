import React from "react";
import Scoreboard from "./Scoreboard";
import Timer from "./Timer";
import "../styles/GameMenu.css";

const GameMenu = ({ getTiles, scores, gameInProgress, setNotification }) => {
  return (
    <div className="gameMenu__wrapper">
      <button onClick={getTiles}>Get more tiles</button>
      <Scoreboard scores={scores} />
      {/* <Timer
        gameInProgress={gameInProgress}
        setNotification={setNotification}
      /> */}
    </div>
  );
};

export default GameMenu;
