import React from "react";
import Tile from "../components/Tile";
import "../styles/TileRack.css";

const TileRack = ({ playerRackTiles, handleClickTile }) => {
  return (
    <div className="tileRack__wrapper">
      {playerRackTiles &&
        playerRackTiles.length > 0 &&
        playerRackTiles.map((tile, index) => (
          <div className="tileRack__tile" key={index}>
            <Tile tile={tile} handleClickTile={handleClickTile} />
          </div>
        ))}
    </div>
  );
};

export default TileRack;
