export const generateBoardSquares = (bonusSquareIndices) => {
  let bonusSquares = [];
  Object.keys(bonusSquareIndices).forEach((key) => {
    let letterMultiplier = null;
    let wordMultiplier = null;
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
    bonusSquares = [...bonusSquares, ...newArray];
  });
  const ordered = bonusSquares.sort((a, b) => (a.index > b.index ? 1 : -1));
  const bonusIndices = ordered.map((obj) => obj.index);
  const allSquares = [];
  for (let i = 0; i < 225; i++) {
    const row = Math.floor(i / 15);
    const col = i % 15;
    if (bonusIndices.includes(i)) {
      const bonusSquare = ordered.filter((obj) => obj.index === i)[0];
      allSquares.push({ ...bonusSquare, row, col });
    } else {
      allSquares.push({
        index: i,
        letterMultiplier: null,
        wordMultiplier: null,
        row,
        col,
      });
    }
  }
  return allSquares;
};
