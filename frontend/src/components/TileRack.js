import React from "react";
import Tile from "../components/Tile";
import "../styles/TileRack.css";

const TileRack = ({
  playerRackTiles,
  handleClickTile,
  tilesToExchange,
  selectedTile,
}) => {
  return (
    <div className="tileRack__wrapper">
      {playerRackTiles &&
        playerRackTiles.length > 0 &&
        playerRackTiles.map((tile, index) => (
          <div className="tileRack__tile" key={index}>
            <Tile
              tile={tile}
              handleClickTile={handleClickTile}
              tilesToExchange={tilesToExchange}
              selectedTile={selectedTile}
            />
          </div>
        ))}
    </div>
  );
};

export default TileRack;
