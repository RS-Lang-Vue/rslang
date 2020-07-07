import UniResponse from "../../models/UniResponse";

export default {
  state: {},
  actions: {
    async addAnswerResult(ctx, { wordId, isCorrectAnswer }) {
      let res = await this.dispatch("getUsersWordsById", { wordId });
      if (!res.success) {
        // показать ошибку пользователю res.error
        return res;
      }
      let userWord = res.result;
      const isNewWord = userWord === undefined;
      if (isNewWord) {
        userWord = {
          difficulty: "hard",
          optional: {
            correctAnswer: 0,
            repeatCount: 0,
            lastDate: 0,
            repeatDate: 0,
            description: "hard",
          },
        };
      }
      userWord.optional.repeatCount += 1;
      userWord.optional.lastDate = Date.now();
      userWord.optional.repeatDate = Date.now() + (isCorrectAnswer ? 50000 : 10000);
      if (isCorrectAnswer) userWord.optional.correctAnswer += 1;
      res = await this.dispatch("setUserWords", { isNewWord, userWord, wordId });
      if (!res.success) {
        // показать ошибку пользователю res.error
        return res;
      }
      return res;
    },
    async getLearnedWordsSortByRepeatDate(ctx, { count = undefined }) {
      const res = await this.dispatch("getUserAggregateWords", { onlyLearned: true });
      if (!res.success) {
        // показать ошибку пользователю res.error
        return res;
      }
      let learnedWords = [...res.result].sort((a, b) => {
        return a.userWord.optional.repeatDate - b.userWord.optional.repeatDate;
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
