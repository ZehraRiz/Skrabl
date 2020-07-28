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
  inviteSent, 
  setInviteSent
}) => {
  const [timeInput, setTimeInput] = useState(20);
  
  let [invite, setInvite] = useState("");

  const handleTimeChange = (e) => {
    setTimeInput(e.target.value);
  };

  const handleClose = () => {
    socket.emit("removeGame", gameId);
    socket.on("removedGame", (data) => {
      console.log(data)
      setInvitedPlayer("");
      setCurrentComponent("Players");
    });
  };

  socket.on("gameJoined2", (data) => {
    if(invite===""){
        setCurrentPlayer(0);
        setGameData(data.game);
        setCurrentComponent("GameScreen");
    }
    else {
      setCurrentPlayer(1);
      setGameData(data.game);
      setInvitedPlayer(invite.host)
      setCurrentComponent("GameScreen");
    }
  });

  

  socket.on("invite", (data) => {
    setInvite(data);
  });
  const acceptInvite = () => {
    setInvite("")
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
      setInvitedPlayer(invite.host)
      setCurrentComponent("GameScreen");
    });
  };

  const handleApplyOptions = () => {
    setInviteSent(true);
    //request to join game
    socket.emit("joinGame", {
      token: user.token,
      gameId: gameId,
      time: timeInput,
    });

    //add notifications here and setDisplayedComponentBack
    socket.on("joinGameError", (data) => {
      console.log(data);
      setInviteSent(false);
      setCurrentComponent = "Players";
    });

    //on succesful game join
    socket.on("gameJoined", (data) => {
      console.log(data);
      setInviteSent(true);
      socket.emit("gameRequest", {
        token: user.token,
        gameId: gameId,
        invitedPlayer: invitedPlayer,
      });
      socket.on("gameRequestError", (data) => {
        //should remove game from uId in backend too
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

        {inviteSent && (
          <p>Waiting for player to accept invite</p>
        )}
        {invite !== "" && (
          <div>
            <p>{invite.host.name} sent you a game request</p>
            <button onClick={acceptInvite}>Click to accept</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InviteScreen;
