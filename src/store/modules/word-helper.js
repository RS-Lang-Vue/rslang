export default {
  state: {},
  actions: {
    async addAnswerResult(ctx, { wordId, isCorrectAnswer }) {
      console.log(wordId);
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
            repeatCount: 0,
            lastDate: 0,
            repeatDate: 0,
            description: "hard",
          },
        };
      }
      userWord.optional.repeatCount += 1;
      userWord.optional.lastDate = Date.now();
      userWord.optional.repeatDate = Date.now() + (isCorrectAnswer ? 10000 : 50000);
      res = await this.dispatch("setUserWords", { isNewWord, userWord, wordId });
      if (!res.success) {
        // показать ошибку пользователю res.error
        return res;
      }
      return res;
    },
  },
  mutations: {},
  getters: {},
};
