import React from "react";
import "../styles/Header.css";
import infoIcon from "../images/help.svg";
import chatIcon from "../images/chat.svg";
import {HeartBeat} from "react-awesome-reveal";

const Header = ({ handleClickMenu, handleClickChat, gameMode, handleStart, newChatMsg, currentComponent }) => {
  return (
    <div className="header__wrapper">
      {gameMode === "Online" && currentComponent === "GameScreen" && (
        <div className="header__chat" onClick={handleClickChat}>
          {newChatMsg && <HeartBeat triggerOnce><div className="newMsg"></div></HeartBeat>}
          <img src={chatIcon} />
        </div>
      )}
      <div className="header__title"><h1 onClick={currentComponent !== "GameScreen" ? handleStart : null}>Skrabl</h1></div>
      <div className="header__rules" onClick={handleClickMenu}>
        <img src={infoIcon} />
      </div>
    </div>
  );
};

export default Header;
