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
	const [ chat, setChat ] = useState([]);
	const [iam, setIam] = useState() // 0 means he was the host and his data is stored as player1 at the backend. 1 means he is player2

	const handleCloseNotificationModal = () => {
		setNotification(null);
	};

	const handleSendMessage = (e) => {
		e.preventDefault();
		const newMessage = e.target.message.value;
		setChat([ ...chat, newMessage ]);
		//emit message to backend here
		e.target.reset();
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
					setIam = {setIam}
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
					setIam= {setIam}
				/>
			)}
			{currentComponent === "GameScreen" && (
				<GameScreen
					setNotification={setNotification}
					handleSendMessage={handleSendMessage}
					chat={chat}
					setCurrentComponent={setCurrentComponent}
					iam= {iam}
					gameData = {gameData}
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
