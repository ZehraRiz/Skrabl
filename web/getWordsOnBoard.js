const findWordsOnBoard = (boardState, returnSingles) => {
  const getWords = (dir) =>
    boardState
      .filter((sq) => sq[dir === "row" ? "col" : "row"] === 0)
      .map((sq) => boardState.filter((boardSq) => boardSq[dir] === sq[dir]))
      .map((dir) => dir.filter((sq) => sq.tile))
      .map((arr) =>
        arr.reduce((acc, val, i) => {
          !i ||
          [...[...acc].pop()].pop()[dir === "row" ? "col" : "row"] !==
            val[dir === "row" ? "col" : "row"] - 1
            ? (acc[acc.length] = [val])
            : acc[acc.length - 1].push(val);
          return acc;
        }, [])
      )
      .reduce((acc, val) => [...acc, ...val], []);

  let res = [...getWords("row"), ...getWords("col")];

  if (!returnSingles) {
    res = res.filter((wordArr) => wordArr.length > 1);
  }

  return res;
};
module.exports = findWordsOnBoard;
