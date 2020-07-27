const users = [];

//Join connection to player

function userJoin(id, name, token, room="registeredUsers") {
    const user = { id, name, token,  room }
    users.push(user);
    return user;
}

//get current user

function getCurrentUser(id) {
    return users.find(user => user.id === id)
}
    //user leaves

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

//get room users
function getRoomUsers() {
    return users
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers

}