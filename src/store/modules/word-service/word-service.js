import apiService from "./api-service";

export default {
  modules: {
    apiService,
  },
  state: {
    settings: {
      group: 0,
      firstWordNum: 0,
      learningWordsCount: 0,
      randomWordsCount: 0,
    },
    userWords: undefined,
    wordContent: {
      learningWords: [],
      randomWords: [],
    },
  },
  actions: {
    async getWords(ctx, { game, learningWordsCount, randomWordsCount }) {
      const gameSettings = this.state.userSetting.optional[game];
      const { group } = gameSettings;
      if (this.state.wordService.userWords === undefined) {
        await this.dispatch("downloadUserWords", group);
      }
      if (
        this.getters.isLoggedIn &&
        gameSettings.useUserWords &&
        this.state.wordService.userWords.length >= gameSettings.minUserWordCount
      ) {
        this.dispatch("getUserWords", { learningWordsCount, randomWordsCount });
      } else {
        const firstWordNum = gameSettings.currentWords[group];
        this.dispatch("getFreeWords", {
          group,
          firstWordNum,
          learningWordsCount,
          randomWordsCount,
        });
      }
    },
  },
  mutations: {
    setSettings(state, { group, firstWordNum, learningWordsCount, randomWordsCount }) {
      this.state.wordService.group = group;
      this.state.wordService.firstWordNum = firstWordNum;
      this.state.wordService.learningWordsCount = learningWordsCount;
      this.state.wordService.randomWordsCount = randomWordsCount;
    },
    setUserWords(state, userWords) {
      this.state.wordService.userWords = userWords[0].paginatedResults;
    },
    setWords(state, { learningWords, randomWords }) {
      this.state.wordService.wordContent = { learningWords, randomWords };
    },
  },
  getters: {
    wordContent(state) {
      return state.wordContent;
    },
  },
};
