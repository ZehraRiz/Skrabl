const registeredUsers = [];


function setRegisteredUser(token, name, currentSessions, lang = "en") {
	const registeredUser = {
		token: token,
		name: name,
		currentSessions: currentSessions,
		socketWithGame: "",
		gameId: "",
		lang: lang
	};
	registeredUsers.push(registeredUser);
	return registeredUser;
}


function findRegisteredUser(token) {
	return registeredUsers.find((user) => user.token == token);
}

function addUserSession(token, socketId, lang) {
	let updatedUser;
	registeredUsers.map((user) => {
		if (user.token == token) {
			user.currentSessions.push(socketId);
			user.lang = lang
			updatedUser = user;
		}
	});
	return updatedUser;
}

function removeGameFromUser(token) {
	let userToUpdate;
	registeredUsers.map(user => {
		if (user.token == token) {
			console.log(`removing ${user.gameId} from ${user.name}`)
			user.gameId = "";
			user.socketWithGame = ""
			
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

function getAllRegisteredUsers(lang) {
	let arr = registeredUsers.filter(user => user.lang=== lang)
	return arr;
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
	console.log(registeredUsers)
	registeredUsers.map((user) => {
		var index = user.currentSessions.indexOf(socketId);
		if (index > -1) {
			userToReturn = user
			user.currentSessions.splice(index, 1);
			return;
		}
	});
	console.log(registeredUsers)
	return userToReturn;
}
function switchGameSocket(u) {
	let gameId;
	registeredUsers.map(user => {
		if (user.token === u.token) {
			if (user.currentSessions.length <= 0) {
				user.socketWithGame = 0
				console.log("no session available to put game on ")
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
