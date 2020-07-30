export const getTurnPoints = (newWords, placedTiles) => {
  let newPoints = 0;
  newWords.forEach((wordObj) => {
    let wordMultipliers = [];
    let wordPoints = wordObj.squares.reduce((total, square) => {
      const isNewTile =
        placedTiles.filter((tile) => tile.id === square.tile.id).length > 0;
      if (isNewTile) {
        wordMultipliers.push(square.wordMultiplier);
        return total + square.tile.points * square.letterMultiplier;
      } else {
        return total + square.tile.points;
      }
    }, 0);
    if (wordMultipliers.length) {
      wordMultipliers.forEach((wordMultiplier) => {
        wordPoints = wordPoints * wordMultiplier;
      });
    }
    newPoints += wordPoints;
  });
  return newPoints;
};
