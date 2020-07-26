import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Login from "./components/Login";
import Header from "./components/Header";
import Players from "./components/Players";
import InviteScreen from "./components/InviteScreen";
import GameScreen from "./components/GameScreen";
import NotificationModal from "./components/NotificationModal";
import "./styles/global.css";
import WelcomeScreen from "./components/WelcomeScreen";
const socket = io("http://localhost:4001");

const App = () => {
  const [currentComponent, setCurrentComponent] = useState("WelcomeScreen");
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState("");
  const [players, setPlayers] = useState([]);
  const [invitedPlayer, setInvitedPlayer] = useState(null);
  const [gameId, setGameId] = useState("");
  const [gameData, setGameData] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [currentPlayer, setcurrentPlayer] = useState(); // 0 means he was the host and his data is stored as player1 at the backend. 1 means he is player2
  // useEffect(() => {
  // 	const userIdFromLS = localStorage.getItem("userId");
  // 	if (userIdFromLS) {
  // 		socket.emit("retriveUser", userIdFromLS)
  // 		console.log("user exists");
  // 		socket.on("userIdError", (data) => {
  // 			console.log(data);
  // 			return;
  // 		});
  // 		socket.on("usernameRegistered", (data) => {
  // 			console.log("updated socket");
  // 			const user = data.user;
  // 			localStorage.removeItem("userId");
  // 			localStorage.setItem("userId", data.user.id);
  // 			setUser(user);
  // 			setPlayers(data.allOnlineUsers);
  // 			setCurrentComponent("Players");
  // 		});
  // 	}
  // }, []);

  useEffect(() => {
    if (gameMode === "Computer") {
      setCurrentComponent("GameScreen");
    }
    if (gameMode === "Online") {
      setCurrentComponent("Login");
    }
  }, [gameMode]);

  const handleCloseNotificationModal = () => {
    setNotification(null);
  };

  const handleChooseComputer = () => {
    setGameMode("Computer");
  };

  const handleChooseOnline = () => {
    setGameMode("Online");
  };

  return (
    <div>
      <Header />
      {currentComponent === "WelcomeScreen" && (
        <WelcomeScreen
          handleChooseOnline={handleChooseOnline}
          handleChooseComputer={handleChooseComputer}
        />
      )}
      {currentComponent === "Login" && (
        <Login
          setCurrentComponent={setCurrentComponent}
          setUser={setUser}
          socket={socket}
          setPlayers={setPlayers}
        />
      )}
      {currentComponent === "Players" && (
        <Players
          players={players}
          setPlayers={setPlayers}
          socket={socket}
          user={user}
          setCurrentComponent={setCurrentComponent}
          setInvitedPlayer={setInvitedPlayer}
          setGameId={setGameId}
          setGameData={setGameData}
          setNotification={setNotification}
          setcurrentPlayer={setcurrentPlayer}
        />
      )}
      {currentComponent === "InviteScreen" && (
        <InviteScreen
          user={user}
          setInvitedPlayer={setInvitedPlayer}
          setCurrentComponent={setCurrentComponent}
          invitedPlayer={invitedPlayer}
          gameId={gameId}
          setGameData={setGameData}
          socket={socket}
          setcurrentPlayer={setcurrentPlayer}
        />
      )}
      {currentComponent === "GameScreen" && (
        <GameScreen
          setNotification={setNotification}
          setCurrentComponent={setCurrentComponent}
          setcurrentPlayer={setcurrentPlayer}
          currentPlayer={currentPlayer}
          gameData={gameData}
          socket={socket}
          gameMode={gameMode}
        />
      )}
      {notification && (
        <NotificationModal
          notification={notification}
          handleCloseNotificationModal={handleCloseNotificationModal}
        />
      )}
    </div>
  );
};

export default App;
