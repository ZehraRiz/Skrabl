const registeredUsers = [];

function findRegisteredUser(token) {
	return registeredUsers.find((user) => user.token == token);
}

function addUserSession(token, socketId) {
	let updatedUser;
	registeredUsers.map((user) => {
		if (user.token == token) {
			user.currentSessions.push(socketId);
			updatedUser = user;
		}
	});
	return updatedUser;
}

function removeGameFromUser(token, gameId) {
	let userToUpdate;
	registeredUsers.map(user => {
		if (user.token == token) {
			user.gameId = "";
			userToUpdate = user
		}
	})
	return userToUpdate
}

function setUserGame(token, gameId) {
	let userToUpdate;
	registeredUsers.map(user => {
		if (user.token == token) {
			user.gameId = gameId;
			userToUpdate = user
		}
	})
	return userToUpdate
}



function getAllRegisteredUsers() {
	return registeredUsers;
}

function setRegisteredUser(token, name, currentSessions) {
	const registeredUser = {
		token: token,
		name: name,
		currentSessions: currentSessions,
		socketWithGame: "",
		gameId: ""
	};
	registeredUsers.push(registeredUser);
	return registeredUser;
}

function setGameSocket(token, socketId) {
	let updatedUser;
	registeredUsers.map(user => {
		if (user.token == token) {
			user.socketWithGame = socketId;
			updatedUser = user
			return;
		}
	})
	return updatedUser;
}


function removeGameSocket(token) {
	let updatedUser;
	registeredUsers.map(user => {
		if (user.token === token) {
			user.socketWithGame = "";
			updatedUser= user
			return
		}
	})
	return updatedUser;
}


function deleteSocket(socketId) {
	let userToReturn;
	registeredUsers.map((user) => {
		var index = user.currentSessions.indexOf(socketId);
		if (index > -1) {
			userToReturn = user
			user.currentSessions.splice(index, 1);
			return;
		}
	});
	return userToReturn;
}
function switchGameSocket(u) {
	let gameId;
	registeredUsers.map(user => {
		if (user.token === u.token) {
			if (user.currentSessions.length <= 0) {
				user.socketWithGame= 0
			}
			else {
				u.socketWithGame = user.currentSessions[0]
				gameId = u.gameId;
			}
		}
	})
	return gameId
}


module.exports = {
	findRegisteredUser,
	setRegisteredUser,
	getAllRegisteredUsers,
	addUserSession,
	deleteSocket,
	setUserGame,
	removeGameFromUser,
	setGameSocket,
	removeGameSocket,
	switchGameSocket
};
