import React from "react";
import "../styles/Tile.css";

const Tile = ({ tile, handleSelectTile }) => {
  return (
    <div className="tile__wrapper" onClick={() => handleSelectTile(tile)}>
      <span className="tile__letter">{tile.letter}</span>
      <span className="tile__points">{tile.points}</span>
    </div>
  );
};

export default Tile;
