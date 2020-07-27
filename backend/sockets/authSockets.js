const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("../utils/users.js");
const { findRegisteredUser, setRegisteredUser, getAllRegisteredUsers, addUserSession, deleteSocket, switchGameSocket } = require("../store/registeredUsers");
const ONLINE_SOCKETS = "onlineSockets"



module.exports.listen = function (io, socket) {
  
//USER LOGIN WITH A USERNAME
	socket.on("username", (username) => {
		if (username === "") {
			//validation needs to be improved
			socket.emit("usernameError", "please enter a valid username");
    } else {
			const registeredUser = setRegisteredUser(Math.random(1 - 100), username, [socket.id]);
			socket.join(ONLINE_SOCKETS);
			socket.emit("usernameRegistered", {
				token: registeredUser.token,
				msg: "you are a registered player now",
				user: registeredUser,
				allOnlineUsers: getAllRegisteredUsers()
			});
			console.log(`${registeredUser.name} has joined the lobby`);
			socket.broadcast.to(ONLINE_SOCKETS).emit("welcomeNewUser", registeredUser);
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

		
		const gameSocket = updatedUser.socketWithGame

		socket.emit("retrievdUser", {
			user: updatedUser,
			allOnlineUsers: getAllRegisteredUsers(),//send all currently online users
			inGame: (gameSocket === "") ? false : true,
			setGameOnSocket: (gameSocket === 0)? true: false,
		});
		if(updatedUser.currentSessions.length <= 1){ socket.broadcast.to(ONLINE_SOCKETS).emit("welcomeNewUser", updatedUser)};
	});

	//USER DISCONNECTS
	socket.on("disconnect", () => {
		console.log("A connection left");
		const user = deleteSocket(socket.id);
		console.log(user)
		if (!user) return; 
		if (user.socketWithGame === socket.id) {
			const gameId = switchGameSocket(user)
			//gameId will be returned if there are more sockets available
			// null will be returned if not more sockets available
			console.log(gameId)
			//emit game to new socket and join
			//send them on extra screen
			const newSetSocket = findRegisteredUser(user.token).socketWithGame
			console.log(newSetSocket)
			io.to(newSetSocket).emit('retrivedGame', gameId);
		}
		if(!user.currentSessions.length){ socket.broadcast.to(ONLINE_SOCKETS).emit("userLeft", user)}; //should be sent to the game as well
		
	});
};
