import UniResponse from "@/models/UniResponse";
import updateUserWord from "@/helpers/user-word/update-user-word";

export default {
  state: {},
  actions: {
    async addAnswerResult({ dispatch }, changes) {
      const { wordId } = changes;
      let res = await dispatch("getUsersAggregateWordsById", wordId);
      if (!res.success) {
        return res;
      }
      let { userWord } = res.result;
      const isNewWord = !userWord;
<<<<<<< HEAD
      userWord = updateUserWord(userWord, changes);
=======
      if (isNewWord) {
        userWord = {
          difficulty: "0",
          optional: {
            correctAnswer: 0,
            repeatCount: 0,
            lastDate: 0,
            repeatDate: 0,
            description: "0",
          },
        };
      }
      userWord.optional.repeatCount += 1;
      userWord.optional.lastDate = Date.now();
      userWord.optional.repeatDate = Date.now() + (isCorrectAnswer ? 50000 : 10000);
      if (userWord.difficulty === "hard") userWord.difficulty = "0";
      if (userWord.optional.correctAnswer === undefined) userWord.optional.correctAnswer = 0;
      if (isCorrectAnswer) userWord.optional.correctAnswer += 1;
>>>>>>> 62b2f8deecc22850bf5e50697d40c0028c45c641
      res = await this.dispatch("setUserWords", { isNewWord, userWord, wordId });
      if (!res.success) {
        return res;
      }
      return res;
    },
    async setUserWordWithCheck({ dispatch }, { userWord, wordId }) {
      let res = await dispatch("getUsersWordsById", { wordId });
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
