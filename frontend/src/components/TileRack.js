import React from "react";
import Tile from "../components/Tile";
import "../styles/TileRack.css";

const TileRack = ({ tiles }) => {
  return (
    <div className="tileRack__wrapper">
      {tiles.map((tile, index) => (
        <div className="tileRack__tile" key={index}>
          <Tile tile={tile} />
        </div>
      ))}
    </div>
  );
};

export default TileRack;
