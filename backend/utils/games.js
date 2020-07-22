const initialPouch = require("../constants/pouch")
let games = [];

//Join connection to player

function gameJoin(gameId) {
    const game = {
        gameId: gameId,
        player1: { playerId: "", isConnected: false },
        player2: { playerId: "", isConnected: false },
        gameState: {
            turn: Math.random(1-2),
            pouch: initialPouch, 
            player1Tiles: [],
            player1Score: 0,
            player2Tiles: [],
            player2Score: 0,
            board: [],
            startTime: "",
            timeLimit: 20,
        }
    }
    games.push(game);
    return game;
}

function isPlayerInGame(userId) {
    let found = false;
    games.map(game => {
        if (game.player1.playerId === userId) {
            found = true
            return
        }
        if (game.player2.playerId === userId) {
            found = true
            return
        }
    })
    return found;
}

function setGamePlayer1(gameId, userId, time) {
    const game = games.map(game => {
        if (game.gameId === gameId) {
            game.timeLimit = time
            if (game.player1.playerId === "") {
                console.log("adding player 1")
                game.player1.playerId = userId;
                return game
            }
            
        }
    }); return game
}

function setGamePlayer2(gameId, userId) {
    const game = games.map(game => {
        if (game.gameId === gameId) {
            if (game.player2.playerId === "") {
                console.log("adding player 2")
                game.player2.playerId = userId;
                return game;
            }    
        }
    }); return game
}


function playerDisconnectFromGame(id) {
    let g = "";
    console.log(id)
    let gamesWithoutUser = [];

    games.map(game => {
        if (game.player1.playerId === id) {
            game.player1.playerId = ""
            g = game
        }
        if (game.player2.playerId === id) {
            game.player2.playerId = ""
            g = game
        }
        gamesWithoutUser.push(game)
        
    })
    games = gamesWithoutUser;

    return g;
}

//get current user

// function getCurrentUser(id) {
//     return users.find(user => user.id === id)
// }
//     //user leaves

function removeGame(id) {
    const index = games.findIndex(game => game.gameId === id);
    if (index !== -1) {
        return games.splice(index, 1)[0]
    }
}

//get all games
function getAllGames() {
    return games
}

module.exports = {
    gameJoin,
    setGamePlayer1,
    setGamePlayer2,
    getAllGames,
    playerDisconnectFromGame,
    isPlayerInGame,
    // getCurrentUser,
    removeGame
    // getRoomUsers

}