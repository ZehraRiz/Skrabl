const { findGame} = require("../store/games.js");
const { findRegisteredUser, setRegisteredUser, getAllRegisteredUsers, addUserSession, deleteSocket, switchGameSocket } = require("../store/registeredUsers");
const {userLoginSocketSetup} = require("../utils/rooms.js")
const ONLINE_SOCKETS = "ONLINE_SOCKETs"
const EN_ROOM = "EN_ROOM"
const DE_ROOM = "DE_ROOM"
const FR_ROOM = "FR_ROOM"
const TR_ROOM = "TR_ROOM"

module.exports.listen = function (io, socket) {
  
//USER LOGIN WITH A USERNAME
	socket.on("username", ({name, lang}) => {
		if (name === "") {
			//validation needs to be improved
			socket.emit("usernameError", "please enter a valid username");
    } else {
			const registeredUser = setRegisteredUser(Math.random(1 - 100), name, [socket.id], lang);
			socket.emit("usernameRegistered", {
				token: registeredUser.token,
				msg: "you are a registered player now",
				user: registeredUser,
				allOnlineUsers: getAllRegisteredUsers()
			});
			userLoginSocketSetup(socket, registeredUser)
			console.log(`${registeredUser.name} has joined the ${registeredUser.lang} lobby`);
		}
  });
  

//USER LOGIN USING TOKEN IN LS 
	socket.on("retriveUser", (token) => {
		if (token === "") {
			socket.emit("tokenError", "We have no saved sessions");
			return;
		}
		const user = findRegisteredUser(token);
		if (!user) {
			socket.emit("tokenError", "We have no saved sessions");
			return;
		}
		socket.join(ONLINE_SOCKETS);
		const updatedUser = addUserSession(token, socket.id)

		let game;
		let invitedPlayer;
		let currentPlayer;
		
		const gameSocket = updatedUser.socketWithGame
		if (gameSocket!== "") { //game id and game socket are set together in all games.  
			game = findGame(user.gameId)
			if (game) {
				socket.join(game.gameId)
				if (token == game.player1.playerId)
				{
					invitedPlayer = findRegisteredUser(game.player2.playerId)
					currentPlayer = 0
				}	
				else {
					invitedPlayer = findRegisteredUser(game.player1.playerId)
					currentPlayer =1
				}
			}
		}
		socket.emit("retrievdUser", {
			user: updatedUser,
			allOnlineUsers: getAllRegisteredUsers(),//send all currently online users
			inGame: (gameSocket === "") ? false : true,
			setGameOnSocket: (gameSocket === 0) ? true : false,
			game: game,
			currentPlayer:currentPlayer,
			invitedPlayer: invitedPlayer //oppponent player
		});
		if(updatedUser.currentSessions.length <= 1){ socket.broadcast.to(ONLINE_SOCKETS).emit("welcomeNewUser", updatedUser)};
	});

	//USER DISCONNECTS
	socket.on("disconnect", () => {
		console.log("A connection left");
		const user = deleteSocket(socket.id);
	
		if (!user) return; 
		if (user.socketWithGame === socket.id) {
			const gameId = switchGameSocket(user)
			//gameId will be returned if there are more sockets available
			// null will be returned if not more sockets available
		
			//emit game to new socket and join
			//send them on extra screen
			const newSetSocket = findRegisteredUser(user.token).socketWithGame
			
			io.to(newSetSocket).emit('retrivedGame', gameId);
		}
		if(!user.currentSessions.length){ socket.broadcast.to(ONLINE_SOCKETS).emit("userLeft", user)}; //should be sent to the game as well
		
	});
};
