const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("../utils/users.js");
const { findRegisteredUser, setRegisteredUser } = require("../store/registeredUsers");




module.exports.listen = function (io, socket) {
  
//USER LOGIN WITH A USERNAME
	socket.on("username", (username) => {
		if (username === "") {
			//validation needs to be improved
			socket.emit("usernameError", "please enter a valid username");
    } else {
      const registeredUser = { token: Math.random(1 - 100), name: username }
      setRegisteredUser(registeredUser);
			const user = userJoin(socket.id, username);
			socket.join(user.room);
      socket.emit("usernameRegistered", {
        token: registeredUser.token,
				msg: "you are a registered player now",
				user: getCurrentUser(socket.id),
				allOnlineUsers: getRoomUsers()
			});
			console.log(`${user.name} has joined the lobby`);
			socket.broadcast.to(user.room).emit("welcomeNewUser", { user: user });
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
		socket.emit("retrievdUser", user);
	});

	//USER DISCONNECTS
  socket.on("disconnect", () => {
    //needs work
		console.log("A connection left");
	});
};
