export const squaresAreOccupied = (indices, boardState) => {
  for (const index of indices) {
    const isOccupied = boardState.filter(
      (square) => square.tile && square.index === index
    )[0];
    if (!isOccupied) {
      return false;
    }
  }
  return true;
};
