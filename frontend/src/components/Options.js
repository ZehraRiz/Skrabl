import React, { useState } from "react";

const Options = ({ handleSendInvite }) => {
  const [timeInput, setTimeInput] = useState(20);
  const handleTimeChange = (e) => {
    setTimeInput(e.target.value);
  };

  const handleClose = () => {
    console.log("closing options");
  };

  return (
    <div>
      <h1>Options</h1>
      <div>
        <label htmlFor="time">Time per player per game (mins):</label>
        <input
          type="number"
          id="time"
          value={timeInput}
          onChange={handleTimeChange}
        />
      </div>
      <button type="button" onClick={handleClose}>
        Cancel
      </button>
      <button type="button" onClick={handleSendInvite}>
        Send Invite
      </button>
    </div>
  );
};

export default Options;
