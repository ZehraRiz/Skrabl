import React from "react";
import "../styles/Login.css";

const Login = ({ setCurrentComponent }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    console.log(name);
    //do backend stuff here
    setCurrentComponent("GameScreen");
    e.target.reset();
  };

  return (
    <div className="login__wrapper">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="name">Your name:</label>
        <input type="text" id="name" />
        <button type="submit">Go</button>
      </form>
    </div>
  );
};

export default Login;
