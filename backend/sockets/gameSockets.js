const {
  gameJoin,
  setGamePlayer1,
  setGamePlayer2,
  getAllGames,
  playerDisconnectFromGame,
  removeGame,
  isPlayerInGame,
  findGame,
  player2Accepted,
  getPlayerNumber,
} = require("../store/games.js");
const {
  findRegisteredUser,
  setUserGame,
  removeGameFromUser,
  setGameSocket,
  removeGameSocket,
} = require("../store/registeredUsers");

const moment = require("moment");
let now = moment();

const games = getAllGames();

module.exports.listen = function (io, socket) {
  //create a game
  socket.on("createGame", ({ userToken, lang }) => {
    const gameId = Math.floor(Math.random() * 10000).toString();
    gameJoin(gameId, lang);
    removeGameSocket(userToken);
    socket.emit("gameCreateResponse", gameId);
  });

  socket.on("playerInGame", (player) => {
    const user = findRegisteredUser(player.token);

    const isBusy = user.socketWithGame != "";
    socket.emit("playerUnavailable", isBusy);
  });

  //cancel game
  socket.on("removeGame", (gameId) => {
    const removedGame = removeGame(gameId);
    if (removedGame) {
      socket.emit(
        "removedGame",
        "The game was removed. please create another one"
      );
      return;
    } else
      socket.emit("removedGame", "Sorry we couldnt find the game to delete");
  });

  //creator joins game
  socket.on("joinGame", ({ token, gameId, time }) => {
    if (!findRegisteredUser(token)) {
      socket.emit("joinGameError", "please register before joining a game");
      return;
    }
    const game = games.find((g) => {
      return g.gameId === gameId;
    });
    if (!game) {
      socket.emit("joinGameError", "Sorry, the game does not exist");
      return;
    } else {
      if (game.player1.playerId !== "") {
        socket.emit("joinGameError", "You are already in game");
        return;
      } else {
        const user = setUserGame(token, gameId);
        const game = setGamePlayer1(gameId, (userId = token), time);
        if (game && user) {
          socket.join(gameId);
          setGameSocket(token, socket.id);
          socket.emit(
            "gameJoined",
            "You have joined the game. Waiting for other player"
          );
        } else {
          socket.emit(
            "joinGameError",
            "Sorry, could not set you up for the game"
          );
        }
      }
    }
  });

  //invite player 2
  socket.on("gameRequest", ({ token, gameId, invitedPlayer }) => {
    const game = games.find((g) => {
      return g.gameId === gameId;
    });
    if (!game) {
      socket.emit("gameRequestError", "Sorry, the game does not exists");
      return;
    } else {
      if (game.player2.playerId !== "") {
        socket.emit("gameRequestError", "Player has already joined your game");
        return;
      } else {
        let guest = findRegisteredUser(invitedPlayer.token);
        let host = findRegisteredUser(token);
        if (!guest || !host) {
          socket.emit("gameRequestError", "Player has left the lobby");
          return;
        }
        setGamePlayer2(gameId, (userId = invitedPlayer.token));
        guest.currentSessions.map((session) => {
          io.to(session).emit("invite", { host: host, game: game });
        });
      }
    }
  });

  //player 2 accepts game request
  socket.on("inviteAccepted", async ({ token, gameId }) => {
    const user = findRegisteredUser(token);
    const game = games.find((g) => {
      return g.gameId === gameId;
    });

    if (!user || !game) {
      socket.emit("2joinGameError", "something went wrong");
      return;
    }

    if (game.player1.playerId === "") {
      socket.emit("2joinGameError", "The host has left");
      return;
    }
    const newGame = player2Accepted(gameId);
    if (newGame) {
      socket.join(gameId);
      setUserGame(token, gameId);
      setGameSocket(token, socket.id);
      io.in(gameId).emit("gameJoined2", { game: newGame });
    } else {
      socket.emit("2joinGameError", "Sorry, could not set you up for the game");
    }
  });

  //GAME FUNCTIONS

  //getTiles
  socket.on("requestTiles", ({ gameId, numTilesNeeded, player }) => {
    const game = findGame(gameId);
    if (!game) {
      socket.emit("gameEnded", "The game has ended");
      return;
    } else {
      tilesToSend = game.gameState.pouch.slice(0, numTilesNeeded);

      if (player === 0) {
        game.gameState.player1Tiles = [
          ...game.gameState.player1Tiles,
          ...tilesToSend,
        ];
      } else {
        game.gameState.player2Tiles = [
          ...game.gameState.player2Tiles,
          ...tilesToSend,
        ];
      }
      game.gameState.pouch.splice(0, numTilesNeeded);
      //send back a slice from the usertiles
      socket.emit("sendingTiles", tilesToSend); //tiles is an array
    }
  });

  socket.on(
    "updateGameState",
    ({
      gameId,
      boardState,
      playerRackTiles,
      player,
      scores,
      returnedTiles,
      currentPlayerTimeLeft,
      opponentTimeLeft,
      consecutivePasses,
      highestScoringWord,
      outcome
    }) => {
      const game = findGame(gameId);
      if (!game) {
        socket.emit("gameEnded", "The game has ended");
        return;
      } else {
        console.log("198 SocketUpdate");
        console.log(highestScoringWord);
        game.gameState.boardState = boardState;
        game.gameState.scores = scores;
        game.gameState.consecutivePasses = consecutivePasses;
        game.gameState.highestScoringWord = highestScoringWord;
        game.gameState.outcome = outcome;
        if (player === 0) {
          game.gameState.player1Tiles = playerRackTiles;
          game.gameState.turn = 1;
          game.gameState.player1TimeLeft = currentPlayerTimeLeft;
          game.gameState.player2TimeLeft = opponentTimeLeft;
        } else {
          game.gameState.player2Tiles = playerRackTiles;
          game.gameState.turn = 0;
          game.gameState.player2TimeLeft = currentPlayerTimeLeft;
          game.gameState.player1TimeLeft = opponentTimeLeft;
        }
        if (returnedTiles && returnedTiles.length > 0) {
          game.gameState.pouch = [...game.gameState.pouch, ...returnedTiles];
        }
        io.in(gameId).emit("gameUpdated", game);
      }
    }
  );

  socket.on("gameOver", (gameId, outcome) => {
    const game = findGame(gameId);
    if (!game) {
      socket.emit("gameEnded", "The game has ended");
      return;
    } else {
      removeGameFromUser(game.player1.playerId, gameId);
      removeGameFromUser(game.player2.playerId, gameId);
      if (outcome) game.gameState.outcome = outcome;
      game.gameState.isOver = true;
      removeGame(gameId);
      io.in(gameId).emit("gameEnd", game);
    }
  });

  //USER CHAT
  socket.on("sendMsg", ({ token, gameId, currentPlayer, newMessage }) => {
    const game = findGame(gameId);
    const user = findRegisteredUser(token);
    if (!game) {
      socket.emit("chatError", "The game has ended");
      return;
    }
    if (!user) {
      socket.emit("chatError", "Something went wrong");
      return;
    }
    const msgObject = {
      playerFromBackend: currentPlayer,
      playerName: user.name,
      msg: newMessage,
      date: now.format("h:mm:ss a"),
    };
    io.in(gameId).emit("receiveMsg", msgObject); //also return time here
  });
};
