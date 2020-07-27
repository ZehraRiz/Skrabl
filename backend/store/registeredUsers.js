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

function findUserBySocket(socketId) {
	const newArr = registeredUsers.map((user) => {
		user.currentSessions.map((session) => {
			if (session == socketId) {
			}
		});
	});
	console.log(newArr);
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

function getAllRegisteredUsers() {
	return registeredUsers;
}

function setRegisteredUser(token, name, currentSessions) {
	const registeredUser = {
		token: token,
		name: name,
		currentSessions: currentSessions
	};
	registeredUsers.push(registeredUser);
	return registeredUser;
}

module.exports = {
	findRegisteredUser,
	setRegisteredUser,
	getAllRegisteredUsers,
	addUserSession,
	deleteSocket
};
