const findDictionaryMatches = require("./findDictionaryMatches");
const getMove = require("./getMove");

const findWord = (fragments, rackTiles, boardState) => {
  //for each word/tile on board, get words that can be created by extending it
  for (let i = 0; i < fragments.length; i++) {
    console.log("FRAGMENT " + i);
    const longerWords = findDictionaryMatches(fragments[i]);
    console.log("LONGER WORDS NUM: " + longerWords.length);
    if (longerWords) {
      //loop over the longer words and go for the first that's possible
      const rackTilesCopy = [...rackTiles];
      for (let j = 0; j < longerWords.length; j++) {
        console.log("GETTING MOVE DATA FOR LONGER WORD " + i);
        const moveData = getMove(
          longerWords[j],
          fragments[i],
          rackTilesCopy,
          boardState
        );
        if (moveData) {
          return moveData;
        }
      }
    } else {
      console.log("NO WORDS IN DICTIONARY");
      return null;
    }
  }
};

module.exports = findWord;
