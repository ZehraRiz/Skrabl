export const getScoresFromWords = (scoredWords) => {
  const res = {
    0: 0,
    1: 0,
  };
  Object.keys(res).forEach(
    (key, i) =>
      (res[i] = scoredWords[i].reduce((total, word) => total + word.points, 0))
  );
  return res;
};
