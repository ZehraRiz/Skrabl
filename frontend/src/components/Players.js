import React, {useState} from "react";

const Players = ({ players, socket, user, setCurrentComponent, setInvitedPlayer, setGameId }) => {
   
	let [allPlayers, setAllPlayers] = useState(players)
	let [isUnavailable, setIsUnvailable] = useState(false)
	let [invite, setInvite] = useState("")

	socket.on("invite", data => {
	  console.log(data.gameId)
     setInvite(data.gameId)
  });
	
	const acceptInvite = () => {
		console.log(`trying to join game ${invite}`)
	}
	
	 socket.on("welcomeNewUser", ({ user }) => {
     setAllPlayers([...allPlayers, user])
    });
  
	const sendInvite = (player) => {
		setIsUnvailable(false)
		socket.emit("playerInGame", player);

		socket.on("playerUnavailable", (data => {
			if (data === true) {
				console.log(data)
			setIsUnvailable(true);
			return;
			}
			else {
					setInvitedPlayer(player);
	  socket.emit("createGame", user.id);
		//invalid userId on create game
		socket.on("createGameError", data => { console.log(data); return; });
				socket.on("gameCreateResponse", (data) => {
			console.log("the game Id got back: " +data)
			setGameId(data)
			setInvitedPlayer(player)
			setCurrentComponent("InviteScreen");
		});

			}
			
		}))


		
	};

	

	return (
		<div>
			<h1>Players Online</h1>
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
			{isUnavailable && <p>player is in another game</p>}
			{invite!=="" && <div>
				<p>You have an invite</p>
				<button onClick={acceptInvite}>Click to accpet</button>
			</div>}
		</div>
	);
};

export default Players;