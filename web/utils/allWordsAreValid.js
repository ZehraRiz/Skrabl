const getWordsOnBoard = require("../getWordsOnBoard");
const fs = require("fs");
const path = require("path");
const appDir = path.dirname(require.main.filename);

const allWordsAreValid = (boardState, newTileIds, lang) => {
  let wordListToUse;
  if (lang === "en") {
    wordListToUse = appDir + "/dictionaries/englishNormal.txt";
  } else if (lang === "tr") {
    wordListToUse = appDir + "/dictionaries/turkishNormal.txt";
  } else if (lang === "fr") {
    wordListToUse = appDir + "/dictionaries/frenchNormal.txt";
  } else if (lang === "de") {
    wordListToUse = appDir + "/dictionaries/germanNormal.txt";
  }

  const allWords = getWordsOnBoard(boardState, false);
  const allWordsNew = allWords.filter((arr) =>
    arr.some((square) => newTileIds.includes(square.tile.id))
  );
  const allWordsNewString = [];
  allWordsNew.forEach((wordArr) => {
    const string = wordArr.map((square) => square.tile.letter).join("");
    allWordsNewString.push(string);
  });
  for (let i = 0; i < allWordsNewString.length; i++) {
    const word = allWordsNewString[i];
    const wordsSmall = fs.readFileSync(wordListToUse);
    const regex = new RegExp("," + word + ",");
    if (regex.test(wordsSmall)) {
    } else {
      return false;
    }
  }
  return true;
};

module.exports = allWordsAreValid;
