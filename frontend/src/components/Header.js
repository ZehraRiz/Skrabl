import React from "react";
import "../styles/Header.css";
import infoIcon from "../images/rules.svg";


const Header = ({handleClickRules}) => {
  return (
    <div className="header__wrapper">
      <h1>Skrabl</h1>
      <div className="header__rules" onClick={handleClickRules} ><img src={infoIcon}/></div>
    </div>
  );
};

export default Header;
