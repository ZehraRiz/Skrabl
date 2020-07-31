const express = require("express");
const router = express.Router();
const fs = require("fs");
const getWordsOnBoard = require("./getWordsOnBoard");

const generateWords = (wordsOnBoard, rackTiles, lang, boardState) => {
  const rackLetters = rackTiles.map((tile) => tile.letter);
  const possibleWords = [];
  wordsOnBoard.forEach((wordArray) => {
    let dirs;
    //if only one square
    if (!wordArray[1]) {
      dirs = ["x", "y"];
    } else if (wordArray[0].row < wordArray[1].row) {
      dirs = ["y"];
    } else {
      dirs = ["x"];
    }
    const wordString = wordArray.map((square) => square.tile.letter).join("");
    const regexString = `.*${wordString}.*`;
    const regExp = new RegExp(regexString, "gi");
    let wordListToUse;
    if (lang === "en") {
      wordListToUse = "./englishSmall.txt";
    } else if (lang === "tr") {
      wordListToUse = "./turkish.txt";
    } else if (lang === "fr") {
      wordListToUse = "./french.txt";
    }
    const wordList = fs.readFileSync(wordListToUse, "utf8");
    const words = wordList.match(regExp);
    if (words && words.length > 0) {
      words.forEach((word) => {
        let canFit = false;
        //loop over word and remove letters that are already on board
        const index = word.search(wordString);
        const lettersBefore = word.substr(0, index);
        const lettersAfter = word.substr(index + wordString.length);
        const remainingLetters = lettersBefore + lettersAfter;
        if (!remainingLetters.length) return;
        //check if you have the required letters to create the word
        rackLettersToCheck = [...rackLetters];
        for (let i = 0; i < remainingLetters.length; i++) {
          if (!rackLettersToCheck.includes(remainingLetters[i])) {
            haveLetters = false;
            return;
          } else {
            rackLettersToCheck = rackLettersToCheck.filter(
              (letter) => letter !== remainingLetters[i]
            );
          }
        }
        dirs.forEach((dir) => {
          const max = 14;
          const min = 0;
          const propToCheck = dir === "x" ? "col" : "row";
          if (
            lettersAfter.length + wordArray[wordArray.length - 1][propToCheck] >
              max ||
            wordArray[0][propToCheck] - lettersBefore.length < min
          ) {
            canFit = false;
            return;
          }

          //get placement info (which letters need to go on which squares)
          const placement = {};
          const squaresToUseIndices = [];
          let step;
          dir === "x" ? (step = 1) : (step = 15);
          //first part of word
          for (let i = 0; i < lettersBefore.length; i++) {
            let toSubtract;
            if (dir === "x") {
              toSubtract = lettersBefore.length * 1;
              toSubtract = toSubtract - i * 1;
            } else {
              toSubtract = 15;
              toSubtract = lettersBefore.length * toSubtract;
              toSubtract = toSubtract - i * 15;
            }
            const squareIndex = wordArray[0].index - toSubtract;
            if (squareIndex < 0) {
              canFit = false;
              return;
            }
            //check if square is unoccupied
            const isOccupied = squaresAreOccupied([squareIndex], boardState);
            if (isOccupied) {
              canFit = false;
              return;
            }
            squaresToUseIndices.push(squareIndex);
            placement[squareIndex] = lettersBefore[i];
          }
          //second part of word
          for (let i = 0; i < lettersAfter.length; i++) {
            let toAdd;
            if (dir === "x") {
              toAdd = 1 * 1;
              toAdd = toAdd * i;
              toAdd = toAdd + 1;
            } else {
              toAdd = 15;
              iPlusOne = i + 1;
              toAdd = toAdd * iPlusOne;
            }
            const squareIndex = wordArray[wordArray.length - 1].index + toAdd;
            if (squareIndex > 224) {
              canFit = false;
              return;
            }
            //check if square is unoccupied
            const isOccupied = squaresAreOccupied([squareIndex], boardState);
            if (isOccupied) {
              canFit = false;
              return;
            }
            squaresToUseIndices.push(squareIndex);
            placement[squareIndex] = lettersAfter[i];
          }
          canFit = true;
          //check whether placement will result in any non-valid words on the board
          const rackTilesCopy = [...rackTiles];
          //place tiles in temporary board array
          const newBoardState = boardState.map((square) => {
            if (squaresToUseIndices.includes(square.index)) {
              const index = rackTilesCopy.findIndex(
                (tile) => tile.letter === placement[square.index]
              );
              const tileToPlace = rackTilesCopy[index];
              rackTilesCopy.splice(index, 1);
              return { ...square, tile: tileToPlace };
            } else {
              return square;
            }
          });
          //check all words on updated board
          const moveIsValid = allWordsAreValid(newBoardState, lang);
          if (moveIsValid) {
            const possibleWord = {
              word,
              boardState: newBoardState,
              updatedSquares: squaresToUseIndices,
            };
            possibleWords.push(possibleWord);
          }
        });
      });
    }
  });
  return possibleWords;
};

const allWordsAreValid = (boardState, lang) => {
  if (lang === "en") {
    wordListToUse = "./englishBig.txt";
  } else if (lang === "tr") {
    wordListToUse = "./turkish.txt";
  } else if (lang == "fr") {
    wordListToUse = "./french.txt";
  }
  const allWords = getWordsOnBoard(boardState, false);
  const allWordsString = [];
  allWords.forEach((wordArr) => {
    const string = wordArr.map((square) => square.tile.letter).join("");
    allWordsString.push(string);
  });
  for (let i = 0; i < allWordsString.length; i++) {
    const word = allWordsString[i];
    const wordsBig = fs.readFileSync(wordListToUse);
    const regex = new RegExp("\\n" + word + "\\n");
    if (regex.test(wordsBig)) {
    } else {
      return false;
    }
  }
  return true;
};

const squaresAreOccupied = (indices, boardState) => {
  for (const index of indices) {
    const occupyingTile = boardState.filter(
      (square) => square.index === index && square.tile
    )[0];
    if (occupyingTile) {
      return true;
    }
  }
  return false;
};

router.post("/", (req, res) => {
  const { rackTiles, boardState, lang } = req.body;
  let wordsOnBoard;
  let isFirstMove;
  let firstRackTile;
  wordsOnBoard = getWordsOnBoard(boardState, true);
  if (!wordsOnBoard.length) {
    isFirstMove = true;
    //if first word, place one tile from rack in middle so rest of code can function like normal
    firstRackTile = rackTiles[0];
    wordsOnBoard = [
      [
        {
          index: 112,
          row: 7,
          col: 7,
          letterMultiplier: 1,
          wordMultiplier: 1,
          tile: firstRackTile,
        },
      ],
    ];
  }
  const possibleWords = generateWords(
    wordsOnBoard,
    rackTiles,
    lang,
    boardState
  );

  if (!possibleWords.length) {
    const res = { pass: true };
    return res;
  } else {
    const longestWord = possibleWords.sort(
      (a, b) => b.word.length - a.word.length
    )[0];
    //make sure tile on centre square is actually a part of the new word
    if (isFirstMove) {
      longestWord.boardState = longestWord.boardState.map((square) => {
        if (square.index === 112) {
          return { ...square, tile: firstRackTile };
        } else {
          return square;
        }
      });
      longestWord.updatedSquares.push(112);
    }
    res.status(200).send(longestWord);
  }
});

module.exports = router;
