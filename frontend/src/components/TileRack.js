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
  handleDragOver,
  handleDrop,
}) => {
  return (
    <div
      className="tileRack__wrapper"
      id="rack"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {playerRackTiles &&
        playerRackTiles.length > 0 &&
        playerRackTiles.map((tile, index) => (
          <Tile
            tile={tile}
            handleClickTile={handleClickTile}
            tilesToExchange={tilesToExchange}
            selectedTile={selectedTile}
            lang={lang}
            turn={turn}
            boardIsDisabled={boardIsDisabled}
            rackIndex={index}
            key={index}
          />
        ))}
    </div>
  );
};

export default TileRack;
