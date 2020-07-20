import React from "react";

const Board = ({ boardData }) => {
  return (
    <div className="board__wrapper">
      <h1>Board</h1>
      {boardData &&
        boardData.map((square, index) => (
          <div className="board__square" key={index}></div>
        ))}
    </div>
  );
};

export default Board;
