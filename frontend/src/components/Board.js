import React from "react";
import "../styles/Board.css";
import Star from "../images/star.svg";

const getBonusClassName = (square) => {
  let bonusClassName = "";

  switch (square.letterMultiplier) {
    case 2:
      bonusClassName = "double-letter";
      break;
    case 3:
      bonusClassName = "triple-letter";
      break;
    default:
      bonusClassName = bonusClassName;
  }
  switch (square.wordMultiplier) {
    case 2:
      bonusClassName = "double-word";
      break;
    case 3:
      bonusClassName = "triple-word";
      break;
    default:
      bonusClassName = bonusClassName;
  }

  return bonusClassName;
};

const getBonusText = (square) => {
  let bonusText = "";
  switch (square.letterMultiplier) {
    case 2:
      bonusText = "2L";
      break;
    case 3:
      bonusText = "3L";
      break;
    default:
      bonusText = bonusText;
  }
  switch (square.wordMultiplier) {
    case 2:
      bonusText = "2W";
      break;
    case 3:
      bonusText = "3W";
      break;
    default:
      bonusText = bonusText;
  }
  if (square.index === 112) {
    bonusText = "";
  }
  return bonusText;
};

const Board = ({
  handleClickSquare,
  handleClickPlacedTile,
  boardState,
  isDisabled,
  lang,
  handleDrop,
  handleDragOver,
}) => {
  const getLetter = (tile) => {
    let letter;
    if (lang === "tr" && tile.letter === "i") {
      letter = "İ";
    } else if (lang === "tr" && tile.letter === "ı") {
      letter = "I";
    } else {
      letter = tile.letter.toUpperCase();
    }
    return letter;
  };

  return (
    <div className="board__wrapper">
      <div className={"board__board " + (isDisabled ? "disabled" : "")}>
        {boardState &&
          boardState.length > 0 &&
          boardState.map((square, index) => {
            const bonusClassName = getBonusClassName(square);
            let placedTile;
            if (square.tile) {
              placedTile = (
                <span
                  className="board__tile"
                  onClick={() => handleClickPlacedTile(square.tile)}
                  draggable
                  id={square.tile.id}
                  data-origin="board"
                >
                  <span>{getLetter(square.tile)}</span>
                  <span className="tile__points--sm">{square.tile.points}</span>
                </span>
              );
            }
            return (
              <div
                className={`board__square ${bonusClassName} ${
                  index === 112 && "board__centre"
                }`}
                key={index}
                id={index}
                onClick={(e) => handleClickSquare(square)}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {!placedTile && (
                  <span className="board__bonus-text">
                    {getBonusText(square)}
                  </span>
                )}
                {!placedTile && index === 112 && (
                  <img className="center__star" src={Star} />
                )}
                {placedTile && placedTile}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Board;
