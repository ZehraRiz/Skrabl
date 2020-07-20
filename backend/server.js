const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const port = 4001 
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

connections = [];
players = [];
games = [];


//when a client connects to the server
io.on("connection", socket => {
  console.log("New connection")
  socket.emit("message", "You are a new connection, from server")
  connections.push(socket);

  //recieve username
  socket.on("username", username => {
    if (username === "") { //validation needs to be improved
      socket.emit("usernameError", "please enter a valid username")
    }
    else {
      const id = Math.random().toString(36).substr(2, 7)
      players.push({playerId: id, playerName: username}) //make this into a room
      socket.emit("usernameRegistered", {msg: "you are a registered player now", players: players})
      socket.broadcast.emit('welcomeNewUser', `${username} has joined`);
    }
  })

 
   
  socket.on('disconnect', () => { //should also be removed from players[]
    io.emit("message", "A connection has left")
    connections.splice(connections.indexOf(socket), 1)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))