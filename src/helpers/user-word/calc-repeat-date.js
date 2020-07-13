import factors from "./factors";

export default (diff, isCorrectAnswer, attemptСount) => {
  const { base, difficulty, attempt } = factors;
  return Date.now() + base(isCorrectAnswer) * difficulty[diff] * attempt(attemptСount);
};
