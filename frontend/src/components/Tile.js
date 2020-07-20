import React from "react";
import "../styles/Tile.css";

const Tile = ({ tile }) => {
  return (
    <div className="tile__wrapper">
      <span className="tile__letter">{tile.letter}</span>
      <span className="tile__points">{tile.points}</span>
    </div>
  );
};

export default Tile;
