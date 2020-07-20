import React from "react";
import Tile from "../components/Tile";
import "../styles/TileRack.css";

const TileRack = ({ playerTiles, handleSelectTile }) => {
  return (
    <div className="tileRack__wrapper">
      {playerTiles &&
        playerTiles.length > 0 &&
        playerTiles.map((tile, index) => (
          <div className="tileRack__tile" key={index}>
            <Tile tile={tile} handleSelectTile={handleSelectTile} />
          </div>
        ))}
    </div>
  );
};

export default TileRack;
