const EN_ROOM = "EN_ROOM"
const DE_ROOM = "DE_ROOM"
const FR_ROOM = "FR_ROOM"
const TR_ROOM = "TR_ROOM"


function userRoomSocketSetup(socket, lang){
    switch (lang) {
        case "en":
            socket.join(EN_ROOM); break;
        case "de":
            socket.join(DE_ROOM); break;
        case "fr":
            socket.join(FR_ROOM); break;
        case "tr":
            socket.join(TR_ROOM); break;
    }
}

function userBroadcastToRoom(socket, registeredUser) {
       switch (registeredUser.lang) {
        case "en":
            socket.broadcast.to(EN_ROOM).emit("welcomeNewUser", registeredUser); break;
        case "de":
            socket.broadcast.to(DE_ROOM).emit("welcomeNewUser", registeredUser); break;
        case "fr":
            socket.broadcast.to(FR_ROOM).emit("welcomeNewUser", registeredUser); break;
        case "tr":
            socket.broadcast.to(TR_ROOM).emit("welcomeNewUser", registeredUser); break;
    }
}

function userLeaveRoom(socket, registeredUser) {
       switch (registeredUser.lang) {
        case "en":
            socket.leave(EN_ROOM); break;
        case "de":
            socket.leave(DE_ROOM); break;
        case "fr":
            socket.leave(FR_ROOM); break;
        case "tr":
            socket.leave(TR_ROOM); break;
    }
}

function userLeftBroadcastToRoom(socket, registeredUser) {
       switch (registeredUser.lang) {
        case "en":
            socket.broadcast.to(EN_ROOM).emit("userLeft", registeredUser); break;
        case "de":
            socket.broadcast.to(DE_ROOM).emit("userLeft", registeredUser); break;
        case "fr":
            socket.broadcast.to(FR_ROOM).emit("userLeft", registeredUser); break;
        case "tr":
            socket.broadcast.to(TR_ROOM).emit("userLeft", registeredUser); break;
    }
}

function boradcastRoomChangeToAllSessions(socket, lang) {
    socket.on('user message', function (msg) {
    socket.broadcast.emit('user message', socket.nickname, msg);
  });
}





module.exports = {
    userRoomSocketSetup,
    userBroadcastToRoom,
    userLeftBroadcastToRoom,
    userLeaveRoom,
    boradcastRoomChangeToAllSessions
}