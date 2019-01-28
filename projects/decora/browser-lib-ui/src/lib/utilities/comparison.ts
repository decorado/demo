export const DecCompareAsString = (a, b) => {
  const stringA = JSON.stringify(a);
  const stringB = JSON.stringify(b);
  return stringA === stringB;
};
