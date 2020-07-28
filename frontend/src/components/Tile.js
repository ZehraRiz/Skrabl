import React from "react";
import "../styles/Tile.css";

const Tile = ({ tile, handleClickTile, tilesToExchange, selectedTile }) => {
  const tileSelected =
    tilesToExchange.filter((item) => item.id === tile.id).length > 0 ||
    selectedTile === tile
      ? true
      : false;
  return (
    <div
      className={
        tileSelected ? "tile__wrapper tile__wrapper--selected" : "tile__wrapper"
      }
      onClick={() => handleClickTile(tile)}
    >
      <span className="tile__letter">{tile.letter.toUpperCase()}</span>
      <span className="tile__points">{tile.points}</span>
    </div>
  );
};

export default Tile;
