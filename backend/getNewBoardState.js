const getNewBoardState = (moveData, boardState) => {
  const newBoardState = boardState.map((square) => {
    if (moveData.updatedSquares.includes(square.index)) {
      //get first tile with same letter from rack and insert
      const index = moveData.updatedRackTiles.findIndex(
        (tile) => tile.letter === moveData.placement[square.index]
      );
      const tileToPlace = moveData.updatedRackTiles[index];
      return { ...square, tile: tileToPlace };
    } else {
      return square;
    }
  });
  return { boardState: newBoardState };
};

module.exports = getNewBoardState;
