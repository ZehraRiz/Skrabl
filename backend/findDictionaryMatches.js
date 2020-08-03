const fs = require("fs");

const findDictionaryMatches = (word, lang) => {
  let wordList;
  if (lang === "en") {
    wordList = "./dictionaries/englishSmall.txt";
  } else if (lang === "tr") {
    wordList = "./dictionaries/turkishSmall.txt";
  }
  const wordStr = word.map((square) => square.tile.letter).join("");
  const regexString = `(?<=,)[^,]*${wordStr}[^,]*(?=,)`;
  const regExp = new RegExp(regexString, "gi");
  const dictionary = fs.readFileSync(wordList, "utf8");
  const matches = dictionary.match(regExp);
  if (matches) {
    const words = matches.filter((word) => word.length <= 8);
    return words;
  } else {
    return null;
  }
};

module.exports = findDictionaryMatches;
