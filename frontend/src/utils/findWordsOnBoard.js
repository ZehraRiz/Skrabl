const checkSquare = (dir, boardState, placedTiles) => {
  let wordStart = "",
    wordScore = 0,
    wordMultipliers = [],
    newWord = false,
    words = [],
    letters = [];
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      let col;
      let row;
      if (dir === "across") {
        col = j;
        row = i;
      } else {
        col = i;
        row = j;
      }
      var currentSquare = boardState[col + row * 15];
      if (!currentSquare.tile) {
        if (wordStart !== "" && letters.length > 1) {
          wordMultipliers.forEach((wordMultiplier, wordScore) => {
            wordScore = wordScore * wordMultiplier;
          });
          words.push({
            word: letters.join(""),
            start: wordStart,
            dir: dir,
            newWord: newWord,
            wordScore: wordScore,
          });
          newWord = false;
        }
        wordStart = "";
        letters = [];
        newWord = false;
        wordScore = 0;
      } else {
        letters.push(currentSquare.tile.letter);
        if (
          placedTiles.filter((item) => item.id === currentSquare.tile.id)
            .length > 0
        ) {
          newWord = true;
          wordMultipliers.push(currentSquare.wordMultiplier);
          wordScore +=
            currentSquare.tile.points * currentSquare.letterMultiplier;
        } else {
          wordScore += currentSquare.tile.points;
        }
        if (wordStart !== "" && col === 14) {
          //duplicated
          wordMultipliers.forEach((wordMultiplier, wordScore) => {
            wordScore = wordScore * wordMultiplier;
          });
          words.push({
            word: letters.join(""),
            start: wordStart,
            dir: dir,
            newWord: newWord,
            wordScore: wordScore,
          });
          newWord = false;
        } else if (wordStart == "") {
          wordStart = `${row}-${col}`;
        }
      }
    }
  }
  return words;
};

export const findWordsOnBoard = (boardState, placedTiles) => {
  const dirs = ["across", "down"];
  let words = [];
  dirs.forEach((dir) => {
    const res = checkSquare(dir, boardState, placedTiles);
    words = [...words, ...res];
  });
  return words;
};
