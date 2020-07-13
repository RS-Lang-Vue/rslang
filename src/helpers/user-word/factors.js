export default {
  base(isCorrectAnswer) {
    return isCorrectAnswer ? 50000 : 10000;
  },
  difficulty: {
    0: 1,
    1: 0.5,
    2: 1.5,
    3: 3,
  },
  attempt(count) {
    switch (count) {
      case 1:
        return 1;
      case 2:
        return 0.9;
      case 3:
        return 0.7;
      default:
        return 0.5;
    }
  },
};
