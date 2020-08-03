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

module.exports = squaresAreOccupied;
