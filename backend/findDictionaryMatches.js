const fs = require("fs");

const findDictionaryMatches = (word) => {
  const wordStr = word.map((square) => square.tile.letter).join("");
  const regexString = `(?<=,)[^,]*${wordStr}[^,]*(?=,)`;
  const regExp = new RegExp(regexString, "gi");
  const dictionary = fs.readFileSync("./dictionaries/englishSmall.txt", "utf8");
  const matches = dictionary.match(regExp);
  if (matches) {
    const words = matches.filter((word) => word.length <= 8);
    return words;
  } else {
    return null;
  }
};

module.exports = findDictionaryMatches;
