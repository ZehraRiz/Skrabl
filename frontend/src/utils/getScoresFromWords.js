export const getScoresFromWords = (scoredWords) => {
  console.log("get scores from words");
  console.log(scoredWords);
  const res = {
    0: 0,
    1: 0,
  };
  Object.keys(res).forEach(
    (key, i) =>
      (res[i] = scoredWords[i].reduce((total, word) => total + word.points, 0))
  );
  console.log(res);
  return res;
};
