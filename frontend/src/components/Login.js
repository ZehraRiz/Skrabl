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
	setGameData
}) => {
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
				//found your previous session
				setUser(data.user);
				if (data.setGameOnSocket) {
					//setup thhe game and return;
					if (!data.game.player2.isConnected) {
						//player 2 hasnt accepted yet
						console.log("player 2 hanst accpted");
						setGameId(data.game.gameId);
						setInvitedPlayer(data.invitedPlayer);
						setInviteSent(true);
						setCurrentComponent("InviteScreen");
						return;
					} else {
						//SET BACK GAME 
						console.log(data)
						setInvitedPlayer(data.invitedPlayer);
						setCurrentPlayer(data.currentPlayer);
						setGameData(data.game);
						setCurrentComponent("GameScreen");
					}
					return;
				}

				if (data.inGame) {
					setCurrentComponent("UserBusy");
				} else {
					setPlayers(
						data.allOnlineUsers.filter((user) => {
							return user.token != localStorage.getItem("token");
						})
					);
					setCurrentComponent("Players");
				}
			});
		} else setCurrentComponent("Login");
	}, []);

	const handleLogin = (e) => {
		e.preventDefault();
		const name = e.target.name.value;
		socket.emit("username", name);
		socket.on("usernameError", (data) => {
			console.log(data);
			return;
		});
		socket.on("usernameRegistered", (data) => {
			console.log("got back user token: " + data.token);
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
		<Fade triggerOnce>
			<div className="login__wrapper">
				<h2>Login</h2>
				<form onSubmit={handleLogin}>
					<label htmlFor="name">Your name:</label>
					<input type="text" id="name" maxLength="12"/>
					<button type="submit">Go</button>
				</form>
			</div>
		</Fade>
	);
};

export default Login;
