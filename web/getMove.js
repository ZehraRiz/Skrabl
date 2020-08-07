const squaresAreOccupied = require("./utils/squaresAreOccupied");
const allWordsAreValid = require("./utils/allWordsAreValid");

const getMove = (longerWord, wordOnBoard, rackTiles, boardState, lang) => {
  let rackLettersAvailable = rackTiles.map((tile) => tile.letter);
  const blanksAvailable = rackTiles.filter((tile) => tile.letter === "");
  const wordOnBoardStr = wordOnBoard
    .map((square) => square.tile.letter)
    .join("");
  let tilesUsed = [];
  let moveFound = false;
  let dirs;
  //if only one square
  if (wordOnBoard.length < 2) {
    dirs = ["x", "y"];
  } else if (wordOnBoard[0].row < wordOnBoard[1].row) {
    dirs = ["y"];
  } else {
    dirs = ["x"];
  }
  //could check if letter on board appears multiple times in word from dictionary
  //could try all positionings in that case rather than just one
  const index = longerWord.search(wordOnBoardStr);
  const lettersBefore = longerWord.substr(0, index);
  const lettersAfter = longerWord.substr(index + wordOnBoardStr.length);
  const remainingLetters = lettersBefore + lettersAfter;
  const squaresToUseIndices = [];
  let placement = {};
  if (remainingLetters.length === 0) {
    return null;
  }
  for (let i = 0; i < remainingLetters.length; i++) {
    const letter = remainingLetters[i];
    if (
      !rackLettersAvailable.includes(letter) &&
      blanksAvailable.length === 0
    ) {
      return null;
    } else if (
      !rackLettersAvailable.includes(letter) &&
      blanksAvailable.length > 0
    ) {
      if (blanksAvailable.length > 0) {
        for (let i = 0; i < rackTiles.length; i++) {
          if (rackTiles[i].letter === "") {
            blanksAvailable.pop();
            rackTiles[i].letter = letter;
            break;
          }
        }
      }
    } else {
      if (longerWord === "keep") {
      }
      const indexToRemove = rackLettersAvailable.findIndex(
        (rackLetter) => rackLetter === letter
      );
      rackLettersAvailable.splice(indexToRemove, 1);
    }
  }
  for (let i = 0; i < dirs.length; i++) {
    //reset placement and tiles used when trying diff direction
    placement = {};
    tilesUsed = [];
    const dir = dirs[i];
    const max = 14;
    const min = 0;
    const propToCheck = dir === "x" ? "col" : "row";
    if (
      lettersAfter.length + wordOnBoard[wordOnBoard.length - 1][propToCheck] >
        max ||
      wordOnBoard[0][propToCheck] - lettersBefore.length < min
    ) {
      return null;
    }
    //get placement info (which letters need to go on which squares)
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
        break;
      }
      const isOccupied = squaresAreOccupied([squareIndex], boardState);
      if (isOccupied) {
        break;
      }
      squaresToUseIndices.push(squareIndex);
      placement[squareIndex] = lettersBefore[i];
      //get first tile in rack that matches
      const tileToUse = rackTiles.filter(
        (tile) => tile.letter === lettersBefore[i]
      )[0];
      tilesUsed.push(tileToUse);
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
      const squareIndex = wordOnBoard[wordOnBoard.length - 1].index + toAdd;
      if (squareIndex > 224) {
        break;
      }
      const isOccupied = squaresAreOccupied([squareIndex], boardState);
      if (isOccupied) {
        break;
      }
      squaresToUseIndices.push(squareIndex);
      placement[squareIndex] = lettersAfter[i];
      const tileToUse = rackTiles.filter(
        (tile) => tile.letter === lettersAfter[i]
      )[0];
      tilesUsed.push(tileToUse);
    }
    if (tilesUsed.length === remainingLetters.length) {
      //move has been found
      const newBoardState = boardState.map((square) => {
        if (squaresToUseIndices.includes(square.index)) {
          //get first tile with same letter from rack and insert
          const index = rackTiles.findIndex(
            (tile) => tile.letter === placement[square.index]
          );
          const tileToPlace = rackTiles[index];
          return { ...square, tile: tileToPlace };
        } else {
          return square;
        }
      });
      const usedTileIds = tilesUsed.map((tile) => tile.id);
      const newRackTiles = rackTiles.filter(
        (tile) => !usedTileIds.includes(tile.id)
      );
      const moveIsValid = allWordsAreValid(newBoardState, usedTileIds, lang);

      if (moveIsValid) {
        return {
          word: longerWord,
          placement,
          newBoardState,
          newRackTiles,
          tilesUsed,
        };
      }
      //if move isn't valid, check next dir (if there is one)
    }
  }
  //if loops over both dirs and no move is possible
  return null;
};

module.exports = getMove;
