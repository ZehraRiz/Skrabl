let games = [];

//Join connection to player

function gameJoin(gameId) {
    const game = {
        gameId: gameId,
        player1: { playerId: "", score: 0 },
        player2: { playerId: "", score: 0 },
        gameState: []
    }
    games.push(game);
    return game;
}

function setGamePlayer(gameId, userId) {
    games.map(game => {
        if (game.gameId === gameId) {
            if (game.player1.playerId === "") {
                console.log("adding player 1")
                game.player1.playerId = userId;
                return;
            }
            else {
                game.player2.playerId = userId
                console.log("adding player 2")
                return;
            }
        }
    })
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

// function userLeave(id) {
//     const index = users.findIndex(user => user.id === id);
//     if (index !== -1) {
//         return users.splice(index, 1)[0]
//     }
// }

//get all games
function getAllGames() {
    return games
}

module.exports = {
    gameJoin,
    setGamePlayer,
    getAllGames,
    playerDisconnectFromGame
    // getCurrentUser,
    // userLeave,
    // getRoomUsers

}