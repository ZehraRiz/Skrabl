import React from "react";
import "../styles/Login.css";

const Login = ({ setCurrentComponent, setUser, socket, setPlayers }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    socket.emit("username", name);
    socket.on("usernameError", (data) => {
      console.log("invalid user name " + data);
      return;
    });
    socket.on("usernameRegistered", (data) => {
      const user = data.user;
      //set in ls
      setUser(user)
      setPlayers(data.allOnlineUsers)
      setCurrentComponent("Players");
  });
    
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