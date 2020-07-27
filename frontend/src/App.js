import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Login from "./components/Login";
import Header from "./components/Header";
import Players from "./components/Players";
import InviteScreen from "./components/InviteScreen";
import GameScreen from "./components/GameScreen";
import NotificationModal from "./components/NotificationModal";
import "./styles/global.css";
const socket = io("http://localhost:4001");

const App = () => {
	const [ currentComponent, setCurrentComponent ] = useState("Login");
	const [ notification, setNotification ] = useState(null);
	const [ user, setUser ] = useState("");
	const [ players, setPlayers ] = useState([]);
	const [ invitedPlayer, setInvitedPlayer ] = useState(null);
	const [ gameId, setGameId ] = useState("");
	const [ gameData, setGameData ] = useState(null);
	const [ currentPlayer, setcurrentPlayer ] = useState();

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

	const handleCloseNotificationModal = () => {
		setNotification(null);
	};

	return (
		<div>
			<Header />
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
