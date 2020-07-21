import React, { useState } from "react";
import "../styles/InviteScreen.css";

const InviteScreen = ({
  handleSendInvite,
  invitedPlayer,
  setInvitedPlayer,
  setCurrentComponent,
}) => {
  const [timeInput, setTimeInput] = useState(20);
  const handleTimeChange = (e) => {
    setTimeInput(e.target.value);
  };

  const handleClose = () => {
    setInvitedPlayer(null);
    setCurrentComponent("Players");
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
        <button type="button" onClick={handleSendInvite}>
          Send Invite
        </button>
      </div>
    </div>
  );
};

export default InviteScreen;
