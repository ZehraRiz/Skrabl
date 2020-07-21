import React from "react";
import "../styles/Players.css";

const Players = ({ allPlayers, user, acceptInvite, handleRequestGame }) => {
  return (
    <div className="players__wrapper">
      <h3>Players Online</h3>
      <form onSubmit={acceptInvite}>
        <input type="text" id="invite" placeholder="Enter invite code" />
        <button type="submit">Accept Invite</button>
      </form>
      Clink on a player to invite them for a game
      <ul className="players__list">
        {allPlayers.length > 0 &&
          allPlayers.map((player, index) => {
            if (player.id !== user.id)
              return (
                <li
                  key={index}
                  value={player}
                  onClick={() => {
                    handleRequestGame(player);
                  }}
                  className="players__player"
                >
                  {player.name}
                </li>
              );
            else return;
          })}
      </ul>
    </div>
  );
};

export default Players;
