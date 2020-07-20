import React from "react";
import io from "socket.io-client";
import Login from "./components/Login";
import Header from "./components/Header";
import Players from "./components/Players";
import Options from "./components/Options";
import Board from "./components/Board";
import { boardData } from "./assets/boardData";

const App = () => {
  const socket = io("http://localhost:4001");

  //When a new client connects
  socket.on("message", (data) => {
    console.log(data);
  });

  //enter a username from the client'side. Hardcoding for now
  socket.emit("username", "Zehra");

  //invalid/empty username
  socket.on("usernameError", (data) => {
    console.log(data);
  });

  //on correct username, connection registered as a player list of all other players. need a way to keep this list updated. can be done at the front end too
  socket.on("usernameRegistered", (data) => {
    console.log(data);
  });

  //broadcast to other players that a new player has registered
  socket.on("welcomeNewUser", (data) => {
    console.log(data);
  });

  const players = [{ name: "Tom" }, { name: "Zehra" }, { name: "John" }];

  return (
    <div>
      <Header />
      <Login />
      <Players players={players} />
      <Options />
      <Board boardData={boardData} />
    </div>
  );
};

export default App;
