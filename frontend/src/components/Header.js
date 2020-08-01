import React from "react";
import "../styles/Header.css";
import infoIcon from "../images/help.svg";
import chatIcon from "../images/chat.svg";

const Header = ({ handleClickRules, handleClickChat, gameMode, handleStart }) => {
  return (
    <div className="header__wrapper">
      {gameMode === "Online" && (
        <div className="header__chat" onClick={handleClickChat}>
          <img src={chatIcon} />
        </div>
      )}
      <h1 onClick={handleStart}>Skrabl</h1>
      <div className="header__rules" onClick={handleClickRules}>
        <img src={infoIcon} />
      </div>
    </div>
  );
};

export default Header;
