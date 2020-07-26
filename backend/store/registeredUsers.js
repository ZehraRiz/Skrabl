const registeredUsers = []

function findRegisteredUser(token) {
    return registeredUsers.find(user => user.token == token)
}

function setRegisteredUser(user) {
    registeredUsers.push(user)
}

module.exports = {
    findRegisteredUser,
    setRegisteredUser,
}