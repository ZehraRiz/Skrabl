export const getHighestScoringWord = (scoredWords) => {
  const res = [...scoredWords[0], ...scoredWords[1]].sort(
    (a, b) => b.points - a.points
  )[0];
  return res;
};
