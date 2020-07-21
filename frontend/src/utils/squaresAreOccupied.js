export const squaresAreOccupied = (indices, boardState) => {
  for (const index of indices) {
    if (
      !boardState.filter((square) => {
        if (square.tile && square.tile.square === index) {
          return square;
        } else {
          return false;
        }
      })[0]
    ) {
      return false;
    }
  }
  return true;
};
