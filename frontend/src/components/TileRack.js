import React from "react";
import Tile from "../components/Tile";
import "../styles/TileRack.css";

const TileRack = ({
  playerRackTiles,
  handleClickTile,
  tilesToExchange,
  selectedTile,
  lang,
  turn,
  boardIsDisabled,
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
              lang={lang}
              turn={turn}
              boardIsDisabled={boardIsDisabled}
            />
          </div>
        ))}
    </div>
  );
};

export default TileRack;
