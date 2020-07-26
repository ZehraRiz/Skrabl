import React from "react";

const WelcomeScreen = ({ setCurrentComponent }) => {
  const handleChooseComputer = () => {
    setCurrentComponent("GameScreen");
  };

  const handleChooseOnline = () => {
    setCurrentComponent("Login");
  };

  return (
    <div>
      <h1>Words With Mates</h1>
      <div>
        <button onClick={handleChooseComputer}>Play again the computer</button>
        <button onClick={handleChooseOnline}>
          Play against someone online
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
