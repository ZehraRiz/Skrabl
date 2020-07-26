export const generateBoardSquares = (bonusSquareIndices) => {
  let bonusSquares = [];
  Object.keys(bonusSquareIndices).forEach((key) => {
    let letterMultiplier = 1;
    let wordMultiplier = 1;
    if (key === "doubleLetter") {
      letterMultiplier = 2;
    } else if (key === "tripleLetter") {
      letterMultiplier = 3;
    } else if (key === "doubleWord") {
      wordMultiplier = 2;
    } else if (key === "tripleWord") {
      wordMultiplier = 3;
    }
    const newArray = bonusSquareIndices[key].map((index) => ({
      index,
      letterMultiplier,
      wordMultiplier,
    }));
    bonusSquares = [...bonusSquares, ...newArray].sort((a, b) =>
      a.index > b.index ? 1 : -1
    );
  });
  const bonusIndices = bonusSquares.map((obj) => obj.index);
  const allSquares = [];
  const totalSquares = 225;
  const squaresPerRow = 15;
  for (let i = 0; i < totalSquares; i++) {
    const row = Math.floor(i / squaresPerRow);
    const col = i % squaresPerRow;
    if (bonusIndices.includes(i)) {
      const bonusSquare = bonusSquares.find((obj) => obj.index === i);
      allSquares.push({ ...bonusSquare, row, col });
    } else {
      allSquares.push({
        index: i,
        letterMultiplier: 1,
        wordMultiplier: 1,
        row,
        col,
      });
    }
  }
  return allSquares;
};
