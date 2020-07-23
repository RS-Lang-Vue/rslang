import UniResponse from "@/models/UniResponse";
import updateUserWord from "@/helpers/user-word/update-user-word";
import UserWord from "../../helpers/user-word/user-word";

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
      userWord = updateUserWord(userWord, changes);
      res = await this.dispatch("setUserWords", { isNewWord, userWord, wordId });
      if (!res.success) {
        return res;
      }
      return res;
    },
    async changeDifficulty({ dispatch }, { difficulty, wordId }) {
      let res = await dispatch("getUsersWordsById", { wordId });
      if (!res.success) {
        return res;
      }
      let userWord = res.result;
      const isNewWord = userWord === undefined;
      if (isNewWord) userWord = new UserWord();
      userWord.difficulty = difficulty;
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
      const oldUserWord = res.result;
      const isNewWord = oldUserWord === undefined;
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
