const express = require("express");
const router = express.Router();
const readline = require("readline");
const fs = require("fs");

const letterValues = {
  1: ["a", "e", "i", "o", "u", "l", "n", "r", "s", "t"],
  2: ["d", "g"],
  3: ["b", "c", "m", "p"],
  4: ["f", "h", "v", "w", "y"],
  5: ["k"],
  8: ["j", "x"],
  10: ["q", "z"],
};

const letterValuesExpanded = Object.entries(letterValues).reduce(
  (result, [score, letters]) => {
    letters.forEach((letter) => {
      result[letter] = score;
    });
    return result;
  },
  {}
);

const getNumLettersBefore = (word, letter) => {
  const res = word.search(letter);
  return res;
};

const getNumLettersAfter = (word, letter) => {
  const wordLength = word.length;
  const letterIndex = word.search(letter);
  const res = wordLength - (letterIndex + 1);
  return res;
};

const getUsableSquares = (letter, boardState) => {
  const occupiedSquares = boardState.filter((square) => square.tile);
  const res = occupiedSquares.filter((square) => square.tile.letter === letter);
  return res;
};

const getPossibleWords = async (rackLetters, boardLetters) => {
  const myInterface = readline.createInterface({
    input: fs.createReadStream("words.txt"),
  });
  const res = [];
  for await (const line of myInterface) {
    //this now returns an object or null
    const canFormWord = haveLettersForWord(line, rackLetters, boardLetters);
    if (canFormWord && line.length > 1) {
      res.push({ word: line, letterFromBoard: canFormWord.letterFromBoard });
    }
  }
  return res;
};

const getLettersOnBoard = (boardState) => {
  const occupiedSquares = boardState.filter((square) => square.tile);
  const res = occupiedSquares.map((square) => square.tile.letter);
  return res;
};

const squaresAreUnoccupied = (squares) => {
  const res = squares.every((square) => !square.tile);
  return res;
};

const getSquaresThatMustBeUnoccupied = (
  usableSquare,
  spacesNeededBefore,
  spacesNeededAfter,
  dir,
  boardState,
  word
) => {
  let firstRequired;
  let lastRequired;
  let wordAlignment;
  let wordAlignmentOpposite;
  if (dir === "horizontal") {
    wordAlignment = "row";
    wordAlignmentOpposite = "col";
  } else if (dir === "vertical") {
    wordAlignment = "col";
    wordAlignmentOpposite = "row";
  }
  firstRequired =
    usableSquare[wordAlignmentOpposite] - (spacesNeededBefore + 1);
  lastRequired = usableSquare[wordAlignmentOpposite] + spacesNeededAfter;
  if (firstRequired < 1 || lastRequired > 14) {
    return null;
  }
  //all squares around
  let filter1 = boardState.filter(
    (square) =>
      square[wordAlignment] >= usableSquare[wordAlignment] - 1 &&
      square[wordAlignment] <= usableSquare[wordAlignment] + 1 &&
      square[wordAlignmentOpposite] >= firstRequired &&
      square[wordAlignmentOpposite] <= lastRequired + 1
  );
  //refine filter
  let filter2 = filter1.filter((square) => {
    if (
      square[wordAlignmentOpposite] === firstRequired &&
      square[wordAlignment] !== usableSquare[wordAlignment]
    ) {
      return false;
    } else if (
      square[wordAlignmentOpposite] === usableSquare[wordAlignmentOpposite]
    ) {
      return false;
    } else {
      return true;
    }
  });
  return filter2;
};

const getSpaceBasedOnUsableSquare = (usableSquare, word, boardState) => {
  const numLettersBefore = getNumLettersBefore(word, usableSquare.tile.letter);
  const numLettersAfter = getNumLettersAfter(word, usableSquare.tile.letter);
  const squaresThatMustBeUnoccupiedHorizontal = getSquaresThatMustBeUnoccupied(
    usableSquare,
    numLettersBefore,
    numLettersAfter,
    "horizontal",
    boardState,
    word
  );
  const squaresThatMustBeUnoccupiedVertical = getSquaresThatMustBeUnoccupied(
    usableSquare,
    numLettersBefore,
    numLettersAfter,
    "vertical",
    boardState,
    word
  );
  if (squaresThatMustBeUnoccupiedHorizontal) {
    const areUnoccupied = squaresAreUnoccupied(
      squaresThatMustBeUnoccupiedHorizontal
    );
    if (areUnoccupied) {
      return {
        squareIndex: usableSquare.index,
        direction: "horizontal",
      };
    }
  }

  if (squaresThatMustBeUnoccupiedVertical) {
    const areUnoccupied = squaresAreUnoccupied(
      squaresThatMustBeUnoccupiedVertical
    );
    if (areUnoccupied) {
      return {
        squareIndex: usableSquare.index,
        direction: "vertical",
      };
    }
  }
  return null;
};

const getWordPositioningData = (wordObj, boardState) => {
  const wordLetters = wordObj.word.split("");
  let spaceFound = false;
  let res = {};
  let letterIndex = 0;
  while (!spaceFound && letterIndex < wordLetters.length) {
    const usableSquares = getUsableSquares(
      wordLetters[letterIndex],
      boardState
    );
    for (let i = 0; i < usableSquares.length; i++) {
      //if one of the letters in the word must be taken from the board, check that the tile on the square being checked is the same as it
      if (
        wordObj.letterFromBoard &&
        usableSquares[i].tile.letter !== wordObj.letterFromBoard
      ) {
        return null;
      }
      const spaceOnBoard = getSpaceBasedOnUsableSquare(
        usableSquares[i],
        wordObj.word,
        boardState
      );
      if (spaceOnBoard) {
        res = {
          ...spaceOnBoard,
          letterIndex,
          word: wordObj.word,
          length: wordObj.word.length,
        };
        spaceFound = true;
        break;
      }
    }
    letterIndex++;
  }
  if (!spaceFound) {
    return null;
  } else {
    return res;
  }
};

const haveLettersForWord = (word, rackLetters, boardLetters) => {
  let rackLettersCopy = [...rackLetters].map((tile) => tile.letter);
  let boardLettersCopy = [...boardLetters];
  const splitWord = word.split("");
  let letterFromBoard = false;

  for (let i = 0; i < splitWord.length; i++) {
    const letter = splitWord[i];
    //if the letter's in neither the rack nor board, can't play word
    if (
      !rackLettersCopy.includes(letter) &&
      !boardLettersCopy.includes(letter)
    ) {
      return null;
    }

    //if you've already used one letter from the board and the current letter is not it the rack, can't play word
    if (letterFromBoard && !rackLettersCopy.includes(letter)) {
      return null;
    }

    //if the letters' on the board and not in the rack, you can use it but all subsequent letters of word must be in the rack
    if (
      boardLettersCopy.includes(letter) &&
      !rackLettersCopy.includes(letter) &&
      letterFromBoard === false
    ) {
      letterFromBoard = letter;
    }

    //if the letter's only in the rack OR in both
    //remove one instance of letter from rack
    const indexOfLetterInRack = rackLettersCopy.indexOf(letter);
    rackLettersCopy.splice(indexOfLetterInRack, 1);
  }
  return {
    letterFromBoard,
  };
};

const placeTiles = (wordObj, boardState) => {
  const firstPartOfWord = wordObj.word.slice(0, wordObj.letterIndex);
  const secondPartOfWord = wordObj.word.slice(wordObj.letterIndex + 1);
  const boardSquareToUse = boardState.filter(
    (square) => square.index === wordObj.squareIndex
  )[0];
  let updatedBoardState = [...boardState];
  const updatedSquaresIndices = [];

  //first part
  const firstSquares = [];
  for (let i = 0; i < firstPartOfWord.length; i++) {
    let col;
    let row;
    if (wordObj.direction === "vertical") {
      col = boardSquareToUse.col;
      row = boardSquareToUse.row - firstPartOfWord.length + i;
    } else {
      row = boardSquareToUse.row;
      col = boardSquareToUse.col - firstPartOfWord.length + i;
    }
    const letter = firstPartOfWord[i];
    const points = letterValuesExpanded[letter];
    const square = {
      col,
      row,
      tile: {
        letter,
        points,
      },
    };
    firstSquares.push(square);
  }
  for (let i = 0; i < firstSquares.length; i++) {
    const squareToUpdate = firstSquares[i];
    const matchingBoardSquare = updatedBoardState.filter(
      (square) =>
        square.row === squareToUpdate.row && square.col === squareToUpdate.col
    )[0];
    let updatedSquare = {
      ...squareToUpdate,
      ...squareToUpdate.tile,
      index: matchingBoardSquare.index,
      letterMultiplier: matchingBoardSquare.letterMultiplier,
      wordMultiplier: matchingBoardSquare.wordMultiplier,
    };
    updatedSquare.tile.square = matchingBoardSquare.index;
    updatedBoardState = updatedBoardState.map((square) => {
      if (square.index === matchingBoardSquare.index) {
        return updatedSquare;
      } else {
        return square;
      }
    });
    updatedSquaresIndices.push(matchingBoardSquare.index);
  }
  //second part
  const secondSquares = [];
  for (let i = 0; i < secondPartOfWord.length; i++) {
    let col;
    let row;
    if (wordObj.direction === "vertical") {
      col = boardSquareToUse.col;
      row = boardSquareToUse.row + i + 1;
    } else {
      row = boardSquareToUse.row;
      col = boardSquareToUse.col + i + 1;
    }
    const letter = secondPartOfWord[i];
    const points = letterValuesExpanded[letter];

    const square = { col, row, tile: { letter, points } };
    secondSquares.push(square);
  }

  for (let i = 0; i < secondSquares.length; i++) {
    const squareToUpdate = secondSquares[i];
    const matchingBoardSquare = boardState.filter(
      (square) =>
        square.row === squareToUpdate.row && square.col === squareToUpdate.col
    )[0];
    let updatedSquare = {
      ...squareToUpdate,
      tile: { ...squareToUpdate.tile },
      index: matchingBoardSquare.index,
      letterMultiplier: matchingBoardSquare.letterMultiplier,
      wordMultiplier: matchingBoardSquare.wordMultiplier,
    };
    updatedSquare.tile.square = matchingBoardSquare.index;
    updatedBoardState = updatedBoardState.map((square) => {
      if (square.index === matchingBoardSquare.index) {
        return {
          ...updatedSquare,
          index: square.index,
        };
      } else {
        return square;
      }
    });
    updatedSquaresIndices.push(matchingBoardSquare.index);
  }
  return { updatedBoardState, updatedSquaresIndices };
};

const makeMove = async (rackLetters, boardState) => {
  const lettersOnBoard = getLettersOnBoard(boardState);
  //this now returns an array of objects
  //with a word field
  //and a field for any letter that must be used from board
  const possibleWords = await getPossibleWords(rackLetters, lettersOnBoard);
  const playableWords = [];
  possibleWords.forEach((wordObj) => {
    const playableWord = getWordPositioningData(wordObj, boardState);
    if (playableWord) {
      playableWords.push(playableWord);
    }
  });
  if (playableWords.length === 0) {
    return {
      pass: true,
    };
  }
  const longestPlayableWord = playableWords.sort(
    (a, b) => b.length - a.length
  )[0];

  const { updatedBoardState, updatedSquaresIndices } = placeTiles(
    longestPlayableWord,
    boardState
  );
  const firstPartOfWord = longestPlayableWord.word.slice(
    0,
    longestPlayableWord.letterIndex
  );
  const secondPartOfWord = longestPlayableWord.word.slice(
    longestPlayableWord.letterIndex + 1
  );
  const lettersUsed = [...firstPartOfWord, ...secondPartOfWord];
  return {
    pass: false,
    boardState: updatedBoardState,
    word: longestPlayableWord.word,
    updatedSquaresIndices,
    lettersUsed,
  };
};

router.post("/", async (req, res) => {
  const { rackLetters, boardState } = req.body;
  const data = await makeMove(rackLetters, boardState);
  res.status(200).send(data);
});

module.exports = router;
