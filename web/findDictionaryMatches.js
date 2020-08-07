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
    if (level === "easy") {
      wordList = "./dictionaries/turkishEasy.txt";
    } else if (level === "normal") {
      wordList = "./dictionaries/turkishNormal.txt";
    } else {
      wordList = "./dictionaries/turkishHard.txt";
    }
  } else if (lang === "fr") {
    if (level === "easy") {
      wordList = "./dictionaries/frenchEasy.txt";
    } else if (level === "normal") {
      wordList = "./dictionaries/frenchNormal.txt";
    } else {
      wordList = "./dictionaries/frenchHard.txt";
    }
  } else if (lang === "de") {
    if (level === "easy") {
      wordList = "./dictionaries/germanEasy.txt";
    } else if (level === "normal") {
      wordList = "./dictionaries/germanNormal.txt";
    } else {
      wordList = "./dictionaries/germanHard.txt";
    }
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
