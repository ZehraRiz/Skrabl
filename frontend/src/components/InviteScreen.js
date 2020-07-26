import React, { useState } from "react";
import "../styles/InviteScreen.css";

const InviteScreen = ({
  user,
  setInvitedPlayer,
  setCurrentComponent,
  invitedPlayer,
  gameId,
  setGameData,
  socket,
  setCurrentPlayer,
}) => {
  const [timeInput, setTimeInput] = useState(20);
  const [allPlayersReady, setAllPlayersReady] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  let [invite, setInvite] = useState("");

  const handleTimeChange = (e) => {
    setTimeInput(e.target.value);
  };

  const handleClose = () => {
    socket.emit("removeGame", gameId);

    socket.on("removedGame", (data) => {
      setInvitedPlayer("");
      setCurrentComponent("Players");
    });
  };

  socket.on("invite", (data) => {
    setInvite(data);
  });
  const acceptInvite = () => {
    socket.emit("inviteAccepted", {
      userId: user.id,
      gameId: invite.game.gameId,
    });
    socket.on("invalidGame", (data) => {
      console.log(data);
    });
    socket.on("player1left", (data) => {
      console.log(data);
    });
    socket.on("user2Error", (data) => {
      console.log(data);
    });
    socket.on("gameJoined2", (data) => {
      console.log(data);
      setCurrentPlayer(1);
      setGameData(data.game);
      setCurrentComponent("GameScreen");
    });
  };

  const handleApplyOptions = () => {
    setInviteSent(true);
    //request to join game
    socket.emit("joinGame", {
      userId: user.id,
      gameId: gameId,
      time: timeInput,
    });

    //add notifications here and setDisplayedComponentBack
    socket.on("joinGameError", (data) => {
      console.log(data);
      setInviteSent(false);
      setCurrentComponent = "Players";
    });
    socket.on("invalidGame", (data) => {
      console.log(data);
      setInviteSent(false);
      setCurrentComponent = "Players";
    });
    socket.on("player1present", (data) => {
      console.log(data);
      setInviteSent(false);
      setCurrentComponent = "Players";
    });
    socket.on("user1Error", (data) => {
      console.log(data);
      setInviteSent(false);
      setCurrentComponent = "Players";
    });

    //on succesful game join
    socket.on("gameJoined", (data) => {
      console.log(data);
      setInviteSent(true);
      socket.emit("gameRequest", {
        userId: user.id,
        gameId: gameId,
        invitedPlayer: invitedPlayer,
      });
      socket.on("player2present", (data) => {
        console.log(data);
        setInviteSent(false);
        setCurrentComponent = "Players";
      });
      socket.on("gameJoined2", (data) => {
        setCurrentPlayer(0);
        setGameData(data.game);
        setCurrentComponent("GameScreen");
      });
    });
  };

  return (
    <div className="inviteScreen__wrapper">
      <h3>You are inviting: {invitedPlayer.name}</h3>
      <div className="inviteScreen__list">
        <div className="inviteScreen__option">
          <label htmlFor="time">Time per player per game (mins):</label>
          <input
            type="number"
            id="time"
            value={timeInput}
            onChange={handleTimeChange}
          />
        </div>
      </div>
      <div className="inviteScreen__buttons">
        <button type="button" onClick={handleClose}>
          Cancel
        </button>

        {!inviteSent && (
          <button type="button" onClick={handleApplyOptions}>
            Send Invite
          </button>
        )}

        {inviteSent && !allPlayersReady && (
          <p>Waiting for player to accept invite</p>
        )}
        {invite !== "" && (
          <div>
            <p>{invite.host.name} sent you a game request</p>
            <button onClick={acceptInvite}>Click to accpet</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InviteScreen;
