export const generateBoardSquares = (bonusSquareIds) => {
  let bonusSquares = [];
  Object.keys(bonusSquareIds).forEach((key) => {
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
    const newArray = bonusSquareIds[key].map((index) => ({
      id: index,
      letterMultiplier,
      wordMultiplier,
    }));
    bonusSquares = [...bonusSquares, ...newArray];
  });
  const ordered = bonusSquares.sort((a, b) => (a.id > b.id ? 1 : -1));
  const bonusIndices = ordered.map((obj) => obj.id);
  const allSquares = [];
  for (let i = 0; i < 225; i++) {
    const row = Math.floor(i / 15);
    const col = i % 15;
    if (bonusIndices.includes(i)) {
      const bonusSquare = ordered.filter((obj) => obj.id === i)[0];
      allSquares.push({ ...bonusSquare, row, col });
    } else {
      allSquares.push({
        id: i,
        letterMultiplier: null,
        wordMultiplier: null,
        row,
        col,
      });
    }
  }
  return allSquares;
};
