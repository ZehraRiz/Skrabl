export const findWordsOnBoard = (boardState, placedTiles) => {
  let wordStart = "",
    newWord = false,
    words = [],
    letters = [],
    dirs = ["across", "down"],
    squares = [];
  console.log('placedTiles:');
  console.log(placedTiles);
  //console.log('BoardState:');
  //console.log(boardState);
  const checkSquare = (dir, x, y) => {
    if (y === 14) {
      console.log('');
    }
    let [row, col] = dir === "across" ? [x, y] : [y, x];
    //console.log('row / col');
    //console.log(row, col);
    var currentSquare = boardState[col + (row * 15)];
    const addWord = () => {
      words.push({
        word: letters.join(""),
        start: wordStart,
        dir: dir,
        newWord: newWord,
        squares,
      });
      console.log('findWords:');
      console.log(words);
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
      if (wordStart !== "" && col === 14) {
        addWord();
        wordStart = "";
        letters = [];
        newWord = false;
        squares = [];
      } else {
        if (dir == 'across' && wordStart == "" && col !== 14) {
          wordStart = `${row}-${col}`;    
        }
        if (dir == 'down' && wordStart == "" && row !== 14) {
          wordStart = `${row}-${col}`;    
        }
      }
    }
  };

  dirs.forEach((dir) => {
    for (var x = 0; x < 15; x++) {
      for (var y = 0; y < 15; y++) {
        checkSquare(dir, x, y);
        //console.log('checkSquare ' + dir);
        //console.log(x, y);
        //console.log(letters);
        //console.log(wordStart);
      }
    }
  });
  return words;
};
