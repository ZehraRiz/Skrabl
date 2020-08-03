import { squaresAreOccupied } from "../utils/squaresAreOccupied";

export const moveIsValid = (placedTiles, boardState) => {
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
  if (!rowsAreSame && !colsAreSame) {
    console.log("PLACED TILES");
    console.log(placedTiles);
    console.log("OCCUPIED SQUARES");
    console.log(occupiedSquares);
    console.log("NOT ALL IN SAME LINE!");
    return false;
  }
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
    console.log("PLACED TILES");
    console.log(placedTiles);
    console.log("OCCUPIED SQUARES");
    console.log(occupiedSquares);
    console.log("SQUARES THAT MUST BE OCCUPIED");
    console.log(indicesToCheck);
    console.log("MUST BE NO GAP!");
    return false;
  }
  const tilesOnBoard = boardState.filter((square) => square.tile);
  if (tilesOnBoard.length - occupiedSquares.length === 0) {
    //first word on board must have at least two letters and must occupy middle square
    if (placedTiles.length < 2) {
      return false;
    }
    const centerSquareIndex = 112;
    const centerSquare = boardState.filter(
      (square) => square.index === centerSquareIndex
    )[0];
    if (!centerSquare.tile) {
      return false;
    }
  } else {
    //if not first word, it must be connected to at least one other tile on board
    if (tilesOnBoard.length > 0) {
      const aboveAndBelowSquares = boardState.filter(
        (square) =>
          (square[alignment] === firstSquare[alignment] - 1 ||
            square[alignment] === firstSquare[alignment] + 1) &&
          square[alignmentOpposite] >= firstSquare[alignmentOpposite] &&
          square[alignmentOpposite] <= lastSquare[alignmentOpposite]
      );
      const endSquares = boardState.filter(
        (square) =>
          square[alignment] === firstSquare[alignment] &&
          (square[alignmentOpposite] === firstSquare[alignmentOpposite] - 1 ||
            square[alignmentOpposite] === lastSquare[alignmentOpposite] + 1)
      );
      const adjacentSquares = [...aboveAndBelowSquares, ...endSquares];
      const occupiedAdjacentSquares = adjacentSquares.filter(
        (square) => square.tile
      );
      if (occupiedAdjacentSquares.length === 0) {
        console.log("PLACED TILES");
        console.log(placedTiles);
        console.log("OCCUPIED SQUARES");
        console.log(occupiedSquares);
        console.log("ALL ADJACENT SQUARES");
        console.log(adjacentSquares);
        console.log("OCCUPIED ADJACENT SQUARES");
        console.log(occupiedAdjacentSquares);
        console.log("MUST BE CONNECTED TO ANOTHER TILE!");
        return false;
      }
    }
  }
  return true;
};
