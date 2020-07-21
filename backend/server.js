const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const port = 4001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
require("dotenv").config();
const axios = require("axios");

app.use(express.json());

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users.js");
const {
  gameJoin,
  setGamePlayer,
  getAllGames,
  playerDisconnectFromGame,
} = require("./utils/games.js");

const games = getAllGames();

//when a client connects to the server
io.on("connection", (socket) => {
  console.log("New connection");

  //recieve username
  socket.on("username", (username) => {
    if (username === "") {
      //validation needs to be improved
      socket.emit("usernameError", "please enter a valid username");
    } else {
      const user = userJoin(socket.id, username);
      socket.join(user.room);
      socket.emit("usernameRegistered", {
        msg: "you are a registered player now",
        user: getCurrentUser(socket.id),
        allOnlineUsers: getRoomUsers(),
      });
      socket.broadcast.to(user.room).emit("welcomeNewUser", { user: user });
    }
  });

  socket.on("createGame", (userId) => {
    if (getCurrentUser(userId)) {
      const gameId = Math.floor(Math.random() * 10000).toString();
      const game = gameJoin(gameId);
      socket.join(game.gameId);
      socket.emit("gameCreateResponse", gameId);
    } else
      socket.emit("createGameError", "please register before creating a game");
  });

  socket.on("joinGame", ({ gameId, userId }) => {
    // if (!getCurrentUser(userId)) {
    //   socket.emit("joinGameError", "please register before joining a game")
    //   return;
    // }

    // if (!games.filter((game) => { return (game === gameId) })[0]) {
    //   socket.emit("joinGameError", "The game does not exist. Please create or join another")
    //   return
    // }

    const game = games.filter((g) => {
      return g.gameId === gameId;
    });
    if (game.length === 0) {
      console.log("invalid game");
      return;
    } else {
      currentGame = game[0];
      console.log("id of player 1: " + currentGame.player1.playerId);
      console.log("id of player2: " + currentGame.player2.playerId);
      if (
        currentGame.player1.playerId !== "" &&
        currentGame.player2.playerId !== ""
      ) {
        socket.emit(
          "gameIsFull",
          "Sorry, the game you are trying to join is already full"
        );
        return;
      } else {
        if (
          currentGame.player1.playerId === "" ||
          currentGame.player2.playerId === ""
        ) {
          setGamePlayer(gameId, userId);
          socket.broadcast
            .to(currentGame.gameId)
            .emit("gameJoined", `${userId} has joined the game`);
        } //need to send state of the game
      }
    }

    // if (game) {

    // }
    // if (game) {
    //   console.log("your game is: " + game[0])
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit("message", `${user.name} has left`);
      const game = playerDisconnectFromGame(user.id);
      console.log(game);
      if (game !== "") {
        socket.broadcast
          .to(game.gameId)
          .emit("playerLeft", `${user.name} has left the game`);
      } else {
        console.log("user wasnt registered");
      }
    }
    console.log("A connection left");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/verifyWord", async (req, res) => {
  const { words } = req.body;
  const results = {};
  for (const word of words) {
    const uri =
      "https://dictionaryapi.com/api/v3/references/collegiate/json/" +
      word +
      "?key=" +
      process.env.DICTIONARY_KEY;
    try {
      const response = await axios.get(uri);
      if (response.data[0] && response.data[0].meta) {
        console.log(word);
        console.log("is true");
        results[word] = "true";
      } else {
        results[word] = "false";
        console.log(word);
        console.log("is false");
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({ err });
    }
  }
  res.status(200).send(results);
});
