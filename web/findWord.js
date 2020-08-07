const findDictionaryMatches = require("./findDictionaryMatches");
const getMove = require("./getMove");

const findWord = (fragments, rackTiles, boardState, lang, level) => {
  //for each word/tile on board, get words that can be created by extending it
  for (let i = 0; i < fragments.length; i++) {
    const longerWords = findDictionaryMatches(fragments[i], lang, level);
    if (longerWords) {
      //sort longest to shortest
      let longerWordsSorted;
      if (level === "easy") {
        //shortest to longest
        longerWordsSorted = longerWords.sort((a, b) => a.length - b.length);
      } else if (level === "normal") {
        //random
        longerWordsSorted = longerWords;
      } else {
        //longest to shortest
        longerWordsSorted = longerWords.sort((a, b) => b.length - a.length);
      }
      //loop over the longer words and go for the first that's possible
      const rackTilesCopy = [...rackTiles];
      for (let j = 0; j < longerWordsSorted.length; j++) {
        const moveData = getMove(
          longerWordsSorted[j],
          fragments[i],
          rackTilesCopy,
          boardState,
          lang
        );
        if (moveData) {
          return moveData;
        }
      }
    } else {
      return null;
    }
  }
};

module.exports = findWord;
