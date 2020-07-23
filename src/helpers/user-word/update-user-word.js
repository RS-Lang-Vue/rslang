import timeIncrease from "./time-increase";
import UserWord from "./user-word";

export default (userWord, changes) => {
  const { isCorrectAnswer, userEvaluation = 0, attemptСount = 1 } = changes;
  const newUserWord = userWord ? { ...userWord } : new UserWord();
  newUserWord.optional.repeatCount += 1;
  if (!newUserWord.optional.status) newUserWord.optional.status = 0;
  if (isCorrectAnswer) newUserWord.optional.correctAnswer += 1;
  newUserWord.optional.lastDate = Date.now();
  switch (userEvaluation) {
    case 2:
      newUserWord.optional.status = 1;
      break;
    case 3:
      if (isCorrectAnswer) {
        newUserWord.optional.status = 2;
      } else {
        newUserWord.optional.status = attemptСount > 1 ? 1 : 2;
      }
      break;
    case 4:
      if (isCorrectAnswer) {
        if (newUserWord.optional.status < 4) newUserWord.optional.status += 1;
      } else {
        newUserWord.optional.status = attemptСount > 1 ? 1 : 2;
      }
      break;
    default:
      if (isCorrectAnswer) {
        if (newUserWord.optional.status < 4) newUserWord.optional.status += 1;
      } else if (attemptСount > 1) {
        newUserWord.optional.status = 1;
      } else if (newUserWord.optional.status > 1) {
        newUserWord.optional.status -= 1;
      }
      break;
  }
  newUserWord.optional.repeatDate = Date.now() + timeIncrease[newUserWord.optional.status];
  return newUserWord;
};
