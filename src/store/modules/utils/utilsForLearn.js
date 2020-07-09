import shuffle from "./utils";

const mixArrays = (arrays) => {
  const mixArray = arrays.flat();
  return shuffle(mixArray);
};

export default mixArrays;
