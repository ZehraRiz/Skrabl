import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Login from "./components/Login";
import Header from "./components/Header";
import Players from "./components/Players";
import Options from "./components/Options";
import GameScreen from "./components/GameScreen";
import NotificationModal from "./components/NotificationModal";
import "./styles/global.css";
const socket = io("http://localhost:4001");

const App = () => {
  const [currentComponent, setCurrentComponent] = useState("GameScreen");
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState("");
  const [players, setPlayers] = useState([]);
  const [invitedPlayer, setInvitedPlayer] = useState(null);
  const [gameId, setGameId] = useState("")
  const [gameData, setGameData] =useState(null)

 



  // //invalid userId on create game
  // socket.on("createGameError", (data) => {
  //   console.log(data);
  // });

  // //create game succesfull, a gameId is sent back that can be used by two players to play the game
  // socket.on("gameCreateResponse", (data) => {
  //   console.log(data);
  // });

  // //request to join game
  // socket.emit("joinGame", { userId: "userId", gameId: "1871" });

  // //error joining game due to invalid credentials
  // socket.on("joinGameError", (data) => {
  //   console.log(data);
  // });

  // //error joining game because game is full
  // socket.on("gameIsFull", (data) => {
  //   console.log(data);
  // });

  // //on succesful game join
  // socket.on("gameJoined", (data) => {
  //   console.log(data);
  // });

  //if a player leaves
  // socket.on("playerLeft", (data) => {
  //   console.log(data);
  // });

  
  const handleCloseModal = () => {
    setNotification(null);
  };


  return (
    <div>
      <Header />
      {currentComponent === "Login" && (
        <Login setCurrentComponent={setCurrentComponent} setUser={setUser} socket={socket} setPlayers={setPlayers}/>
      )}
      {currentComponent === "Players" && <Players players={players} socket={socket} user={user} setCurrentComponent={setCurrentComponent} setInvitedPlayer={setInvitedPlayer} setGameId={setGameId} />}
      {currentComponent === "Options" && <Options user={user} invitedPlayer={invitedPlayer} gameId={gameId} setGameData={setGameData}/>}
      {currentComponent === "GameScreen" && (
        <GameScreen setNotification={setNotification} />
      )}
      {notification && (
        <NotificationModal
          notification={notification}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
