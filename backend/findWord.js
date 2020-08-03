const findDictionaryMatches = require("./findDictionaryMatches");
const getMove = require("./getMove");
const getNewBoardState = require("./getNewBoardState");
const allWordsAreValid = require("./utils/allWordsAreValid");

const findWord = (fragments, rackTiles, boardState, lang) => {
  //for each word/tile on board, get words that can be created by extending it
  for (let i = 0; i < fragments.length; i++) {
    const longerWords = findDictionaryMatches(fragments[i], lang);
    if (longerWords) {
      //sort longest to shortest
      const longerWordsSorted = longerWords.sort((a, b) => b.length - a.length);
      //loop over the longer words and go for the first that's possible
      const rackTilesCopy = [...rackTiles];
      for (let j = 0; j < longerWordsSorted.length; j++) {
        const moveData = getMove(
          longerWordsSorted[j],
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
          const moveIsValid = allWordsAreValid(
            newBoardState,
            usedTileIds,
            lang
          );
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
