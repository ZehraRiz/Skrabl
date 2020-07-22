import React, { useState } from "react";
import "../styles/InviteScreen.css";

const InviteScreen = ({ user, setInvitedPlayer, setCurrentComponent, invitedPlayer, gameId, setGameData, socket }) => {
  const [timeInput, setTimeInput] = useState(20);

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


  const handleApplyOptions = () => {
		//request to join game
		socket.emit("joinGame", { userId: user.id, gameId: gameId, time: timeInput });


		socket.on("joinGameError", (data) => {console.log(data); return});
		socket.on("invalidGame", (data) => {console.log(data); return});
    socket.on("player1present", (data) => { console.log(data); return });
    socket.on("user1Error", (data) => {console.log(data); return});

		//on succesful game join
    socket.on("gameJoined", (data) => {
      console.log("you joined the game")
      console.log(data)
      socket.emit("gameRequest", { userId: user.id, gameId: gameId, invitedPlayer: invitedPlayer });
      socket.on("player2present", (data) => { console.log(data); return });
			setCurrentComponent("GameScreen");
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
        <button type="button" onClick={handleApplyOptions}>
          Send Invite
        </button>
      </div>
    </div>
  );
};

export default InviteScreen;
