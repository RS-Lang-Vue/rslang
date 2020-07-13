import UniResponse from "@/models/UniResponse";
import UserWord from "@/helpers/user-word/user-word";
import calcRepeatDate from "@/helpers/user-word/calc-repeat-date";

export default {
  state: {},
  actions: {
    async addAnswerResult(
      { dispatch },
      { wordId, isCorrectAnswer, description, attemptСount = 1 }
    ) {
      let res = await dispatch("getUsersAggregateWordsById", wordId);
      if (!res.success) {
        return res;
      }
      let { userWord } = res.result;
      const isNewWord = !userWord;
      if (isNewWord) userWord = new UserWord();
      userWord.optional.repeatCount += 1;
      userWord.optional.lastDate = Date.now();
      if (description) userWord.optional.description = description;
      if (isCorrectAnswer) userWord.optional.correctAnswer += 1;
      userWord.optional.repeatDate = calcRepeatDate(
        userWord.optional.description,
        isCorrectAnswer,
        attemptСount
      );
      res = await this.dispatch("setUserWords", { isNewWord, userWord, wordId });
      if (!res.success) {
        return res;
      }
      return res;
    },
    async setUserWordWithCheck(ctx, { userWord, wordId }) {
      let res = await this.dispatch("getUsersWordsById", { wordId });
      if (!res.success) {
        return res;
      }
      const oldUerWord = res.result;
      const isNewWord = oldUerWord === undefined;
      res = await this.dispatch("setUserWords", { isNewWord, userWord, wordId });
      if (!res.success) {
        return res;
      }
      return res;
    },
    async getLearnedWordsSortByRepeatDate({ dispatch }, { count, difficulty }) {
      const res = await dispatch("getUserAggregateWords", { onlyLearned: true, difficulty });
      if (!res.success) {
        return res;
      }
      let learnedWords = [...res.result].sort((a, b) => {
        return a.userWord?.optional.repeatDate - b.userWord?.optional.repeatDate;
      });
      if (count !== undefined) {
        learnedWords = learnedWords.splice(0, count);
      }
      return new UniResponse(true, learnedWords);
    },
  },
  mutations: {},
  getters: {},
};
