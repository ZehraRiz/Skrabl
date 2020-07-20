export const camelToSentence = (string) => {
  const result = string.replace(/-/g, " ");
  return result;
};
