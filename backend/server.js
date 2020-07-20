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
  console.log("A cliend connected")
  socket.emit("You are a new connection")
  connections.push(socket)


  // const playerId = Math.floor(Math.random() * 100000 + 1);
  // players.push(playerId)
  //broadcast to other users
   socket.broadcast.emit('message', 'hello friends!');
   
  socket.on('disconnect', () => {
    io.emit("message", "A connection has left")
    connections.splice(connections.indexOf(socket), 1)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))