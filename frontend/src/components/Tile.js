import React from "react";
import "../styles/Tile.css";

const Tile = ({ tile, handleClickTile }) => {
  return (
    <div className="tile__wrapper" onClick={() => handleClickTile(tile)}>
      <span className="tile__letter">{tile.letter.toUpperCase()}</span>
      <span className="tile__points">{tile.points}</span>
    </div>
  );
};

export default Tile;
