import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Login from "./components/Login";
import Header from "./components/Header";
import Players from "./components/Players";
import InviteScreen from "./components/InviteScreen";
import UserBusy from "./components/UserBusy";
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
	const [ gameMode, setGameMode ] = useState(null);
	const [ currentPlayer, setCurrentPlayer ] = useState(); // 0 means he was the host and his data is stored as player1 at the backend. 1 means he is player2
	const [ socket, setSocket ] = useState(null);
	const [ inviteSent, setInviteSent ] = useState(false);

	useEffect(
		() => {
			if (gameMode === "Computer") {
				setCurrentPlayer(0);
				setCurrentComponent("GameScreen");
			}
			if (gameMode === "Online") {
				console.log("game mode has changed to 'online' so setting value of socket variable");
				setSocket(io("http://localhost:4001"));
				setCurrentComponent("Login");
			}
		},
		[ gameMode ]
	);

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
		<div className="page">
			<Header />
			{currentComponent === "WelcomeScreen" && (
				<WelcomeScreen handleChooseOnline={handleChooseOnline} handleChooseComputer={handleChooseComputer} />
			)}
			{currentComponent === "Login" && (
				<Login
					setCurrentComponent={setCurrentComponent}
					setUser={setUser}
					socket={socket}
					setPlayers={setPlayers}
					setInvitedPlayer={setInvitedPlayer}
					setGameId={setGameId}
          setInvitedPlayer={setInvitedPlayer}
          setInviteSent = {setInviteSent}
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
					inviteSent={inviteSent}
					setInviteSent={setInviteSent}
				/>
			)}
			{currentComponent === "GameScreen" && (
				<GameScreen
					user={user}
					invitedPlayer={invitedPlayer}
					setNotification={setNotification}
					setCurrentComponent={setCurrentComponent}
					setCurrentPlayer={setCurrentPlayer}
					currentPlayer={currentPlayer}
					gameData={gameData}
					socket={socket}
					gameMode={gameMode}
				/>
			)}
			{currentComponent === "UserBusy" && <UserBusy socket={socket} />}
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
