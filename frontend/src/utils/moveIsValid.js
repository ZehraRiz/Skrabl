import { squaresAreOccupied } from "../utils/squaresAreOccupied";

export const moveIsValid = (placedTiles, boardState) => {
  //must be more than one letter
  if (placedTiles.length < 2) return false;
  //must all be in same row or col
  const occupiedIndices = placedTiles.map((tile) => tile.square);
  const occupiedSquares = boardState.filter((square) =>
    occupiedIndices.includes(square.index)
  );
  const rowsAreSame = occupiedSquares.every(
    (square) => square.row === occupiedSquares[0].row
  );
  const colsAreSame = occupiedSquares.every(
    (square) => square.col === occupiedSquares[0].col
  );
  if (!rowsAreSame && !colsAreSame) return false;
  //must be no gap between the first and last placed tiles
  const sortedSquares = occupiedSquares.sort((a, b) => a.index < b.index);
  const firstSquare = sortedSquares[0];
  const lastSquare = sortedSquares[placedTiles.length - 1];
  let alignment;
  let alignmentOpposite;
  if (rowsAreSame) {
    alignment = "row";
    alignmentOpposite = "col";
  } else {
    alignment = "col";
    alignmentOpposite = "row";
  }
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
