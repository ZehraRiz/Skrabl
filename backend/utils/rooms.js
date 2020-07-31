const EN_ROOM = "EN_ROOM"
const DE_ROOM = "DE_ROOM"
const FR_ROOM = "FR_ROOM"
const TR_ROOM = "TR_ROOM"


function userLoginSocketSetup (socket, registeredUser){
  
    switch (registeredUser.lang) {
        case "en":
            socket.join(EN_ROOM)
            socket.broadcast.to(EN_ROOM).emit("welcomeNewUser", registeredUser);
            break;
        case "de":
            socket.join(DE_ROOM)
            socket.broadcast.to(DE_ROOM).emit("welcomeNewUser", registeredUser);
            break;
        case "fr":
            socket.join(FR_ROOM)
            socket.broadcast.to(FR_ROOM).emit("welcomeNewUser", registeredUser);
            break;
        case "tr":
            socket.join(TR_ROOM)
            socket.broadcast.to(TR_ROOM).emit("welcomeNewUser", registeredUser);
            break;
    }
}

module.exports = {
    userLoginSocketSetup
}