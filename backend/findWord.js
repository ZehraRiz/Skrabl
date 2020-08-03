const findDictionaryMatches = require("./findDictionaryMatches");
const getMove = require("./getMove");
const getNewBoardState = require("./getNewBoardState");
const allWordsAreValid = require("./utils/allWordsAreValid");

const findWord = (fragments, rackTiles, boardState) => {
  //for each word/tile on board, get words that can be created by extending it
  for (let i = 0; i < fragments.length; i++) {
    const longerWords = findDictionaryMatches(fragments[i]);
    if (longerWords) {
      //loop over the longer words and go for the first that's possible
      const rackTilesCopy = [...rackTiles];
      for (let j = 0; j < longerWords.length; j++) {
        const moveData = getMove(
          longerWords[j],
          fragments[i],
          rackTilesCopy,
          boardState
        );
        if (moveData) {
          const usedTileIds = moveData.tilesUsed.map((tile) => tile.id);
          const newRackTiles = rackTiles.filter(
            (tile) => !usedTileIds.includes(tile.id)
          );
          const { boardState: newBoardState } = getNewBoardState(
            moveData,
            boardState
          );
          const moveIsValid = allWordsAreValid(newBoardState, usedTileIds);
          if (moveIsValid) {
            return {
              newBoardState,
              newRackTiles,
              tilesUsed: moveData.tilesUsed,
            };
          }
        }
      }
    } else {
      return null;
    }
  }
};

module.exports = findWord;
