import React from "react";
import io from "socket.io-client";
import Login from "./components/Login";
import Header from "./components/Header";
import Players from "./components/Players";
import Options from "./components/Options";
import GameScreen from "./components/GameScreen";
import "./styles/global.css";

const App = () => {

  //SOCKET FUNCTIONS
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

  //create a new game 
  socket.emit("createGame", "userId");

  //invalid userId on create game
   socket.on("createGameError", (data) => {
    console.log(data);
   });
  
  //create game succesfull, a gameId is sent back that can be used by two players to play the game
  socket.on("gameCreateResponse", (data) => {
    console.log(data);
   });

  //request to join game
  socket.emit("joinGame", {userId: "userId", gameId: "1871"});
  
  //error joining game due to invalid credentials
    socket.on("joinGameError", (data) => {
    console.log(data);
    });
  
  //error joining game because game is full
   socket.on("gameIsFull", (data) => {
    console.log(data);
   });
  
  //on succesful game join
     socket.on("gameJoined", (data) => {
    console.log(data);
   });

  //if a player leaves
  socket.on('playerLeft', (data) => {
    console.log(data);
   });

  return (
    <div>
      {/* <Header />
      <Login />
      <Players players={players} />
      <Options /> */}
      <GameScreen />
    </div>
  );
};

export default App;
