import { squaresAreOccupied } from "../utils/squaresAreOccupied";

export const moveIsValid = (placedTiles, boardState) => {
  //check if more than one letter
  if (placedTiles.length < 2) {
    return false;
  }
  //check that placed tiles are all in same row or col
  const occupiedSquareIndices = placedTiles.map((tile) => tile.square);
  const occupiedSquares = boardState.filter((square) =>
    occupiedSquareIndices.includes(square.index)
  );
  const allRowsAreSame = occupiedSquares.every(
    (square, i, arr) => square.row === arr[0].row
  );
  const allColsAreSame = occupiedSquares.every(
    (square, i, arr) => square.col === arr[0].col
  );
  if (!allRowsAreSame && !allColsAreSame) {
    return false;
  }
  //check that there's no gap between the first and last placed tiles
  const sortedSquares = occupiedSquares.sort((a, b) => a.index < b.index);
  const firstSquare = sortedSquares[0];
  const lastSquare = sortedSquares[placedTiles.length - 1];
  let alignment;
  allRowsAreSame ? (alignment = "row") : (alignment = "col");
  let alignmentOpposite;
  allRowsAreSame ? (alignmentOpposite = "col") : (alignmentOpposite = "row");
  const indicesToCheck = boardState
    .filter(
      (square) =>
        square[alignment] === firstSquare[alignment] &&
        square[alignmentOpposite] >= firstSquare[alignmentOpposite] &&
        square[alignmentOpposite] <= lastSquare[alignmentOpposite]
    )
    .map((square) => square.index);
  if (!squaresAreOccupied(indicesToCheck, boardState)) {
    return false;
  }
  return true;
};
