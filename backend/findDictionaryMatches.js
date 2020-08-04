const fs = require("fs");

const findDictionaryMatches = (word, lang, level) => {
  let wordList;
  if (lang === "en") {
    if (level === "easy") {
      wordList = "./dictionaries/englishEasy.txt";
    } else if (level === "normal") {
      wordList = "./dictionaries/englishNormal.txt";
    } else {
      wordList = "./dictionaries/englishHard.txt";
    }
  } else if (lang === "tr") {
    wordList = "./dictionaries/turkishSmall.txt";
  } else if (lang === "fr") {
    wordList = "./dictionaries/french.txt";
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
