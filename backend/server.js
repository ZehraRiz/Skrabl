const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const port = 4001 
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require("./utils/users.js")



//when a client connects to the server
io.on("connection", socket => {
  console.log("New connection")

  //recieve username
  socket.on("username", username => {
    if (username === "") { //validation needs to be improved
      socket.emit("usernameError", "please enter a valid username")
    }
    else {
      const user = userJoin(socket.id, username)
      socket.join(user.room)
      socket.emit("usernameRegistered", { msg: "you are a registered player now", user: getCurrentUser(user.id), allOnlineUsers: getRoomUsers()  })
      socket.broadcast.to(user.room).emit('welcomeNewUser', `${username} has joined`);
    }
  })

 
   
  socket.on('disconnect', () => { //should also be removed from players[]
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit("message", `${user.name} has left`)
    }
    
    console.log("A connection left")
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))