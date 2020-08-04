export const findWordsOnBoard = (boardState, placedTiles) => {
  let wordStart = "",
    newWord = false,
    words = [],
    letters = [],
    dirs = ["across", "down"],
    squares = [];
  const checkSquare = (dir, x, y) => {
    let [row, col] = dir === "across" ? [x, y] : [y, x];
    var currentSquare = boardState[col + row * 15];
    const addWord = () => {
      words.push({
        word: letters.join(""),
        start: wordStart,
        dir: dir,
        newWord: newWord,
        squares,
      });
      // console.log('findWords:');
      // console.log(words);
      newWord = false;
    };
    if (!currentSquare.tile) {
      if (wordStart !== "" && letters.length > 1) {
        addWord();
      }
      wordStart = "";
      letters = [];
      newWord = false;
      squares = [];
    } else {
      letters.push(currentSquare.tile.letter);
      squares.push(currentSquare);
      if (
        placedTiles.filter((item) => item.id === currentSquare.tile.id).length >
        0
      ) {
        newWord = true;
      }
      if (
        (dir == "across" && wordStart !== "" && col === 14) ||
        (dir == "down" && wordStart !== "" && row === 14)
      ) {
        addWord();
        wordStart = "";
        letters = [];
        newWord = false;
        squares = [];
      } else {
        if (dir == "across" && wordStart == "" && col !== 14) {
          wordStart = `${row}-${col}`;
        }
        if (dir == "down" && wordStart == "" && row !== 14) {
          wordStart = `${row}-${col}`;
        }
      }
    }
  };

  dirs.forEach((dir) => {
    for (var x = 0; x < 15; x++) {
      for (var y = 0; y < 15; y++) {
        checkSquare(dir, x, y);
      }
    }
  });
  return words;
};
