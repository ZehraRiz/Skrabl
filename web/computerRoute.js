const express = require("express");
const router = express.Router();
const getWordsOnBoard = require("./getWordsOnBoard");
const findWord = require("./findWord");

router.post("/", (req, res) => {
  let {
    rackTiles,
    boardState,
    computerConsecutivePasses,
    lang,
    level,
  } = req.body;
  //get all existing full words AND tiles of those words that can be used for new words
  let boardFragments = getWordsOnBoard(boardState, true);
  let isFirstMove;
  //if nothing on board, take one tile from rack (with low points and not a blank) and place on centre square as anchor to build word around
  const anchorTile = rackTiles
    .filter((tile) => tile.letter)
    .sort((a, b) => a.points - b.points)[0];
  if (!boardFragments.length) {
    isFirstMove = true;
    rackTiles.splice(0, 1);
    boardFragments = [
      [
        {
          index: 112,
          row: 7,
          col: 7,
          letterMultiplier: 1,
          wordMultiplier: 1,
          tile: anchorTile,
        },
      ],
    ];
    //also update the board state with this new tile so later the allWordsAreValid function will work properly
    boardState = boardState.map((square) => {
      if (square.index === 112) {
        return { ...square, tile: anchorTile };
      } else {
        return square;
      }
    });
  }
  //try to create a new word first (using just one tile from board), then try extending existing word if not possible
  let boardFragmentsSorted = boardFragments.sort((a, b) => a.length - b.length);
  const newMove = findWord(
    boardFragmentsSorted,
    rackTiles,
    boardState,
    lang,
    level
  );
  if (newMove) {
    //if was first move, include first rack tile that was placed on centre square as part of move
    if (isFirstMove) {
      newMove.newBoardState = newMove.newBoardState.map((square) => {
        if (square.index === 112) {
          return { ...square, tile: anchorTile };
        } else {
          return square;
        }
      });
    }
    res.status(200).send({
      word: newMove.word,
      newBoardState: newMove.newBoardState,
      newRackTiles: newMove.newRackTiles,
      tilesUsed: newMove.tilesUsed,
    });
  } else {
    if (computerConsecutivePasses > 0) {
      res.status(200).send({ exchange: true });
    } else {
      res.status(200).send({ pass: true });
    }
  }
});

module.exports = router;
