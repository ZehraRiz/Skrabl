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

const App = () => {
	const [ currentComponent, setCurrentComponent ] = useState("WelcomeScreen");
	const [ notification, setNotification ] = useState(null);
	const [ user, setUser ] = useState("");
	const [ players, setPlayers ] = useState([]);
	const [ invitedPlayer, setInvitedPlayer ] = useState(null);
	const [ gameId, setGameId ] = useState("");
	const [ gameData, setGameData ] = useState(null);
  const [currentPlayer, setcurrentPlayer] = useState();
    const [socket, setSocket] = useState(null);

	//Search for an existing token in ls and send it
	useEffect(() => {
		const userIdFromLS = localStorage.getItem("token");
		if (userIdFromLS) {
			socket.emit("retriveUser", userIdFromLS);
			console.log("user token exists at frontend");
			//backend does not recognize the token
			socket.on("tokenError", (data) => {
				setCurrentComponent("Login");
				localStorage.removeItem("token");
				console.log(data);
				return;
			});
			socket.on("retrievdUser", (data) => {
				setUser(data.user);
				setPlayers(data.allOnlineUsers.filter((user) => {return(user.token != localStorage.getItem("token"))}));
				setCurrentComponent("Players");
				console.log("found your previous session");
			});
		} else setCurrentComponent("Login");
	}, []);

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
      setCurrentPlayer(0);
      setCurrentComponent("GameScreen");
    }
    if (gameMode === "Online") {
      console.log(
        "game mode has changed to 'online' so setting value of socket variable"
      );
      setSocket(io("http://localhost:4001"));
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
          setCurrentPlayer={setCurrentPlayer}
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
          setCurrentPlayer={setCurrentPlayer}
        />
      )}
      {currentComponent === "GameScreen" && (
        <GameScreen
          setNotification={setNotification}
          setCurrentComponent={setCurrentComponent}
          setCurrentPlayer={setCurrentPlayer}
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
