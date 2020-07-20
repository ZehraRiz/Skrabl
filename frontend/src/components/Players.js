import React from "react";

const Players = ({ players }) => {
  return (
    <div>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Players;
