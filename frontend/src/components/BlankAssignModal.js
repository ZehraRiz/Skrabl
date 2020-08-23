import React from "react";
import "../styles/BlankAssignModal.css";
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const BlankAssignModal = ({ tileId, handleAssignBlank }) => {
  return (
    <div className="blankAssignModal__wrapper">
      <div className="blankAssignModal__content">
        <p>Assign a letter to this tile.</p>
        <div className="blankAssignModal__letters">
          {alphabet.map((letter, index) => (
            <div
              key={index}
              className="blankAssignModal__letter"
              onClick={() => handleAssignBlank(tileId, letter)}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlankAssignModal;
