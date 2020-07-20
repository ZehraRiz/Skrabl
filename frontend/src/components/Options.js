import React, { useState } from "react";

const Options = () => {
  const [timeInput, setTimeInput] = useState(20);

  const handleTimeChange = (e) => {
    setTimeInput(e.target.value);
  };

  const handleApplyOptions = () => {
    console.log("applying options");
    console.log("time: " + timeInput);
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
      <button type="button" onClick={handleApplyOptions}>
        Done
      </button>
    </div>
  );
};

export default Options;
