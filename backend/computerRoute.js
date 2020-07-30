const express = require("express");
const router = express.Router();
const fs = require("fs");
const fileContent = fs.readFileSync("./wordsSmall.txt", "utf8");
const getWordsOnBoard = require("./getWordsOnBoard");

const findExtenderWords = (wordsOnBoardArrays, rackTiles) => {
  const rackLetters = rackTiles.map((tile) => tile.letter);
  const extenderWords = [];
  wordsOnBoardArrays.forEach((wordOnBoard) => {
    let dirs;
    //if only one square
    if (!wordOnBoard[1]) {
      dirs = ["x", "y"];
    } else if (wordOnBoard[0].row < wordOnBoard[1].row) {
      dirs = ["y"];
    } else {
      dirs = ["x"];
    }
    const wordString = wordOnBoard.map((square) => square.tile.letter).join("");
    const regexString = `.*${wordString}.*`;
    const regExp = new RegExp(regexString, "gi");
    const longerWords = fileContent.match(regExp);
    if (longerWords && longerWords.length > 0) {
      longerWords.forEach((longerWord) => {
        let canExtend = false;
        //loop over longer word and remove letters that are already on board
        const index = longerWord.search(wordString);
        const lettersBefore = longerWord.substr(0, index);
        const lettersAfter = longerWord.substr(index + wordString.length);
        const remainingLetters = lettersBefore + lettersAfter;
        if (!remainingLetters.length) return;
        //check if you have the required letters to create the longer word
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
            lettersAfter.length +
              wordOnBoard[wordOnBoard.length - 1][propToCheck] >
              max ||
            wordOnBoard[0][propToCheck] - lettersBefore.length < min
          ) {
            canExtend = false;
            return;
          }
          //get placement info (which letters need to go on which squares)
          const placement = {};
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
            const squareIndex = wordOnBoard[0].index - toSubtract;
            if (squareIndex < 0) {
              canExtend = false;
              return;
            }
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
            const squareIndex =
              wordOnBoard[wordOnBoard.length - 1].index + toAdd;
            if (squareIndex > 224) {
              canExtend = false;
              return;
            }
            placement[squareIndex] = lettersAfter[i];
          }
          canExtend = true;
          const extenderWord = {
            word: longerWord,
            placement,
          };
          extenderWords.push(extenderWord);
        });
      });
    }
  });
  return extenderWords;
};

const allWordsAreValid = async (boardState) => {
  console.log("CHECKING WORDS ARE VALID");
  const allWords = getWordsOnBoard(boardState, false);
  const allWordsString = [];
  allWords.forEach((wordArr) => {
    const string = wordArr.map((square) => square.tile.letter).join("");
    allWordsString.push(string);
  });
  console.log(allWordsString);
  for (let i = 0; i < allWordsString.length; i++) {
    const word = allWordsString[i];
    const wordsBig = fs.readFileSync("./wordsBig.txt");
    const regex = new RegExp("\\b" + word + "\\b");
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

const tryToPlaceWord = async (words, boardState, rackTiles) => {
  const wordsOrderedByLength = words.sort(
    (a, b) => b.word.length - a.word.length
  );
  let res = {};
  for (let i = 0; i < wordsOrderedByLength.length; i++) {
    const wordObj = wordsOrderedByLength[i];
    const squaresToUseIndices = Object.keys(wordObj.placement).map((num) =>
      Number(num)
    );
    //check if required squares are free
    const areOccupied = squaresAreOccupied(squaresToUseIndices, boardState);
    if (areOccupied) {
      continue;
    }
    const rackTilesCopy = [...rackTiles];
    //place tiles in temporary board array
    newBoardState = boardState.map((square) => {
      if (squaresToUseIndices.includes(square.index)) {
        const index = rackTilesCopy.findIndex(
          (tile) => tile.letter === wordObj.placement[square.index]
        );
        const tileToPlace = rackTilesCopy[index];
        rackTilesCopy.splice(index, 1);
        return { ...square, tile: tileToPlace };
      } else {
        return square;
      }
    });
    //check if move is valid
    const moveIsValid = await allWordsAreValid(newBoardState);
    if (moveIsValid) {
      //confirm placement by sending back board state
      res.word = wordObj.word;
      res.boardState = newBoardState;
      res.updatedSquares = squaresToUseIndices;
      return res;
    }
  }
  return res;
};

const makeMove = async (rackTiles, boardState) => {
  const wordsOnBoardArrays = getWordsOnBoard(boardState, true);
  const possibleWords = findExtenderWords(wordsOnBoardArrays, rackTiles);
  if (!possibleWords.length) {
    const res = { pass: true };
    return res;
  }
  try {
    let res = await tryToPlaceWord(possibleWords, boardState, rackTiles);
    if (res.boardState) {
      return res;
    } else {
      const res = { pass: true };
      return res;
    }
  } catch (err) {
    console.log(err);
  }
};

router.post("/", async (req, res) => {
  const { rackTiles, boardState } = req.body;
  try {
    const data = await makeMove(rackTiles, boardState);

    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
