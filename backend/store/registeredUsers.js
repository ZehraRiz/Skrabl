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
	return registeredUsers.find((user) => user.token.toString() === token.toString());
}

function addUserSession(token, socketId, lang) {
	let updatedUser;
	let fromGameEnd = false;
	registeredUsers.map((user) => {
		if (user.token.toString() === token.toString()) {
			const repeatingSession = user.currentSessions.find((session) => session === socketId);
			if (repeatingSession) {
				fromGameEnd= true
			}
			else {
				user.currentSessions.push(socketId);
				user.lang = lang;
			}
			updatedUser = user;
		}
	});
	return {updatedUser, fromGameEnd};
}

function removeGameFromUser(token) {
	let userToUpdate;
	registeredUsers.map((user) => {
		if (user.token.toString() == token.toString()) {
			console.log(`removing ${user.gameId} from ${user.name}`);
			user.gameId = "";
			user.socketWithGame = "";
			userToUpdate = user;
		}
	});
	return userToUpdate;
}

function setUserGame(token, gameId) {
	let userToUpdate;
	registeredUsers.map((user) => {
		if (user.token == token) {
			user.gameId = gameId;
			userToUpdate = user;
		}
	});
	return userToUpdate;
}

function getAllRegisteredUsers(lang) {
	let arrAllUsers = registeredUsers.filter((user) => user.lang === lang);
	let arrOnlineUsers = arrAllUsers.filter((user)=> user.currentSessions.length>0)
	return arrOnlineUsers;
}

function setGameSocket(token, socketId) {
	let updatedUser;
	registeredUsers.map((user) => {
		if (user.token == token) {
			user.socketWithGame = socketId;
			updatedUser = user;
			return;
		}
	});
	return updatedUser;
}


function deleteSocket(socketId) {
	let userToReturn;
	registeredUsers.map((user) => {
		var index = user.currentSessions.indexOf(socketId);
		if (index > -1) {
			userToReturn = user;
			user.currentSessions.splice(index, 1);
			return;
		}
	});
	return userToReturn;
}
function switchGameSocket(u) {
	let gameId;
	registeredUsers.map((user) => {
		if (user.token === u.token) {
			if (user.currentSessions.length <= 0) {
				user.socketWithGame = 0;
			} else {
				u.socketWithGame = user.currentSessions[0];
				gameId = u.gameId;
			}
		}
	});
	return gameId;
}

function noPlayersOnline() {
	let onlineUsers = registeredUsers.filter(user => user.currentSessions.length > 0)
	return onlineUsers.length
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
	switchGameSocket,
	noPlayersOnline
};
