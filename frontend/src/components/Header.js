import React from "react";
import "../styles/Header.css";
import infoIcon from "../images/help.svg";
import chatIcon from "../images/chat.svg";
import {Bounce} from "react-awesome-reveal";

const Header = ({ handleClickRules, handleClickChat, gameMode, handleStart, newChatMsg }) => {
  return (
    <div className="header__wrapper">
      {gameMode === "Online" && (
        <div className="header__chat" onClick={handleClickChat}>
          {newChatMsg && <Bounce triggerOnce><div className="newMsg"></div></Bounce>}
          <img src={chatIcon} />
        </div>
      )}
      <div className="header__title"><h1 onClick={handleStart}>Skrabl</h1></div>
      <div className="header__rules" onClick={handleClickRules}>
        <img src={infoIcon} />
      </div>
    </div>
  );
};

export default Header;
