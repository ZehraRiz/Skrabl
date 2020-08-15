import React, { useEffect } from "react";
import "../styles/Login.css";
import { Fade } from "react-awesome-reveal";

const Login = ({
	setCurrentComponent,
	setUser,
	socket,
	setPlayers,
	setInvitedPlayer,
	setGameId,
	setInviteSent,
	setCurrentPlayer,
	setGameData,
	setNotification,
	handleStart,
	lang
}) => {
	const checkUserData = () => {
		const userIdFromLS = localStorage.getItem("token");
		if (userIdFromLS) {
			console.log("verifying")
			socket.emit("retriveUser", { token: userIdFromLS, lang: lang });
		}
	
	};

	useEffect(() => {
			//backend does not recognize the token
		socket.on("tokenError", (data) => {
			console.log(data);
			setCurrentComponent("Login");
			localStorage.removeItem("token");
			return;
		});

		socket.off("retrivedUser").on("retrievdUser", (data) => {
			console.log("found ur prev session");
			setUser(data.user);
			if (data.setGameOnSocket) {
				//setup thhe game and return;
				if (!data.game.player2.isConnected) {
					//player 2 hasnt accepted yet
					setGameId(data.game.gameId);
					setInvitedPlayer(data.invitedPlayer);
					setInviteSent(true);
					setCurrentComponent("InviteScreen");
					return;
				} else {
					//SET BACK GAME
					setInvitedPlayer(data.invitedPlayer);
					setCurrentPlayer(data.currentPlayer);
					setGameData(data.game);
					setCurrentComponent("GameScreen");
				}
				return;
			}
			if (data.inGame) {
				setCurrentComponent("UserBusy");
				return;
			} else {
				setPlayers(
					data.allOnlineUsers.filter((user) => {
						return user.token != localStorage.getItem("token");
					})
				);
				setCurrentComponent("Players");
			}
		});
	}, [])


	useEffect(() => {
		window.addEventListener("storage", checkUserData);
		checkUserData();

		return () => {
			window.removeEventListener("storage", checkUserData);
		};
	}, []);

	const handleLogin = (e) => {
		e.preventDefault();
		const name = e.target.name.value;
		socket.emit("username", { name, lang });
		socket.on("usernameError", (data) => {
			console.log(data);
			setNotification(data);
			return;
		});
		socket.on("usernameRegistered", (data) => {
			console.log(data);
			const user = data.user;
			localStorage.setItem("token", data.token);
			setUser(user);
			setPlayers(
				data.allOnlineUsers.filter((u) => {
					return u.token != localStorage.getItem("token");
				})
			);
			setCurrentComponent("Players");
		});

		e.target.reset();
	};
	return (
		<Fade className="login__container" triggerOnce>
			<div className="login__wrapper">
				<h2>
					{lang === "en" && "Login"}
					{lang === "tr" && "Giriş"}
					{lang === "fr" && "S'identifier"}
					{lang === "de" && "Anmeldung"}
				</h2>
				<form className="login__form" onSubmit={handleLogin}>
					<label htmlFor="name">
						{lang === "en" && "Your name:"}
						{lang === "tr" && "Adınız:"}
						{lang === "fr" && "Votre nom:"}
						{lang === "de" && "Dein Name:"}
					</label>
					<input type="text" id="name" maxLength="12" />
					<button type="submit">
						{lang === "en" && "Login"}
						{lang === "tr" && "Giriş"}
						{lang === "fr" && "S'identifier"}
						{lang === "de" && "Anmeldung"}
					</button>
					<button className="" onClick={handleStart}>
						{lang === "en" && "Back"}
						{lang === "tr" && "Geri git"}
						{lang === "fr" && "Retourner"}
						{lang === "de" && "Geh zurück"}
					</button>
				</form>
			</div>
		</Fade>
	);
};

export default Login;
