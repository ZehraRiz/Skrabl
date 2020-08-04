import React, { useState } from "react";
import "../styles/Players.css";
import { Fade } from "react-awesome-reveal";

const Players = ({
  players,
  setPlayers,
  socket,
  user,
  setCurrentComponent,
  setInvitedPlayer,
  setGameId,
  setNotification,
  setGameData,
  setCurrentPlayer,
  handleStart,
  lang
}) => {
  let [invite, setInvite] = useState("");
  socket.on("invite", (data) => {
    setInvite(data);
  });
  const acceptInvite = () => {
    socket.emit("inviteAccepted", {
      token: user.token,
      gameId: invite.game.gameId,
    });
    socket.on("2joinGameError", (data) => {
      console.log(data);
    });
    socket.on("gameJoined2", (data) => {
      console.log(data);
      setCurrentPlayer(1);
      setGameData(data.game);
      setInvitedPlayer(invite.host);
      setCurrentComponent("GameScreen");
    });
  };

  socket.on("welcomeNewUser", (data) => {
    if (data.token == localStorage.getItem("token")) return;
    setPlayers([...players, data]);
  });

  socket.on("userLeft", (user) => {
    console.log("a user left" + user)
    setPlayers(players.filter((u) => u.token != user.token));
  });

  const sendInvite = (player) => {
    socket.emit("playerInGame", player);
    socket.on("playerUnavailable", (data) => {
      console.log(data);
      if (data === true) {
        setNotification("Player is in another game");
        return;
      } else {
        socket.emit("createGame", {userToken: user.token, lang: lang});
        //invalid userId on create game
        socket.on("createGameError", (data) => {
          console.log(data);
          return;
        });
        socket.on("gameCreateResponse", (data) => {
          console.log("the game Id got back: " + data);
          setGameId(data);
          setInvitedPlayer(player);
          setCurrentComponent("InviteScreen");
        });
      }
    });
  };

  return (
    <Fade triggerOnce>
      <div className="players__wrapper">
        <h3>Players Online</h3>
        Clink on a player to invite them for a game
        <ul className="players__list">
          {players.map((player, index) => {
            return (
              <li
                key={index}
                value={player}
                onClick={() => {
                  sendInvite(player);
                }}
                className="players__player"
              >
                {player.name}
              </li>
            );
          })}
        </ul>
        {players.length < 1 && (<><p>No one's online at the moment.</p>
        <button className="return__button" onClick={handleStart}>Return to main menu</button></>)}
        {invite !== "" && (
          <div className="player__invitations">
            <h3>Incoming Invitations</h3>
            <div className="player__invite-request">
              <p>{invite.host.name} sent you a game request</p>
              <button onClick={acceptInvite}>Click to accept</button>
              <button className="return__button" onClick={handleStart}>Return to main menu</button>
            </div>
          </div>
        )}
      </div>
    </Fade>
  );
};

export default Players;
