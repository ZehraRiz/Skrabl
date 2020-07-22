import React, { useState } from "react";
import "../styles/Players.css";

const Players = ({
	players,
	setPlayers,
	socket,
	user,
	setCurrentComponent,
	setInvitedPlayer,
	setGameId,
	setNotification,
	setGameData,
	setcurrentPlayer
}) => {
	let [ isUnavailable, setIsUnvailable ] = useState(false); //pretty useless
	let [ invite, setInvite ] = useState("");

	socket.on("invite", (data) => {
		setInvite(data);
	});

	const acceptInvite = () => {
		socket.emit("inviteAccepted", { userId: user.id, gameId: invite.game.gameId });
		socket.on("invalidGame", (data) => {
			console.log(data);
		});
		socket.on("player1left", (data) => {
			console.log(data);
		});
		socket.on("user2Error", (data) => {
			console.log(data);
		});
		socket.on("gameJoined2", (data) => {
			console.log(data);
			setcurrentPlayer(1);
			setGameData(data.game);
			setCurrentComponent("GameScreen");
		});
	};

	socket.on("welcomeNewUser", ({ user }) => {
		setPlayers([ ...players, user ]);
	});

	const sendInvite = (player) => {
		setIsUnvailable(false);
		socket.emit("playerInGame", player);

		socket.on("playerUnavailable", (data) => {
			if (data === true) {
				setIsUnvailable(true);
				setNotification("Player is in another game");
				return;
			} else {
				setInvitedPlayer(player);
				socket.emit("createGame", user.id);
				//invalid userId on create game
				socket.on("createGameError", (data) => {
					console.log(data);
					return;
				});
				socket.on("gameCreateResponse", (data) => {
					console.log("the game Id got back: " + data);
					setGameId(data);
					setInvitedPlayer(player);
					setCurrentComponent("InviteScreen");
				});
			}
		});
	};

	return (
		<div className="players__wrapper">
			<h3>Players Online</h3>
			Clink on a player to invite them for a game
			<ul className="players__list">
				{players.length > 1 &&
					players.map((player, index) => {
						if (player.id !== user.id) {
							return (
								<li
									key={index}
									value={player}
									onClick={() => {
										sendInvite(player);
									}}
									className="players__player">
									{player.name}
								</li>
							);
						}
					})}
			</ul>
			{players.length === 1 && <p>No one's online at the moment.</p>}
			{invite !== "" && (
				<div>
					<p>{invite.host.name} sent you a game request</p>
					<button onClick={acceptInvite}>Click to accpet</button>
				</div>
			)}
		</div>
	);
};

export default Players;
