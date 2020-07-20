export const removeDashes = (string) => {
  const res = string.replace(/-/g, " ");
  return res;
};
