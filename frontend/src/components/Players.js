import React, {useState} from "react";

const Players = ({ players, socket, user, setCurrentComponent, setInvitedPlayer, setGameId }) => {
   
  let [allPlayers, setAllPlayers] = useState(players)

  socket.on("welcomeNewUser", ({ user }) => {
     setAllPlayers([...allPlayers, user])
    });
  
  const sendInvite = (player) => {
	  setInvitedPlayer(player);
	  
		//create a new game
	  socket.emit("createGame", user.id);
	  
		//invalid userId on create game
		socket.on("createGameError", (data) => {
			console.log(data)
			return;
		});

		//create game succesfull, a gameId is sent back that can be used by two players to play the game
	  socket.on("gameCreateResponse", (data) => {
			setGameId(data)
			setCurrentComponent("Options");
		});

		
	};

	const acceptInvite = (e) => {
		e.preventDefault();
		console.log(e.target.invite.value);
	};

	return (
		<div>
			<h1>Players Online</h1>
			<form onSubmit={acceptInvite}>
				<input type="text" id="invite" placeholder="enter invite code" />
				<button type="submit">Continue</button>
      </form>
      Clink on a player to invite them for a game
			<ul>
				{allPlayers.map((player, index) => {
					if (player.id !== user.id)
						return (
							<li
								key={index}
								value={player}
								onClick={() => {
									sendInvite(player);
								}}>
								{player.name}
							</li>
						);
					else return;
				})}
			</ul>
		</div>
	);
};

export default Players;
