export default {
  state: {
    apiService: {
      group: 0,
      firstWordNum: 0,
      learningWordsCount: 0,
      learningWords: [],
      randomWordsCount: 0,
      randomWords: [],
    },
  },
  actions: {
    async getFreeWordsByPages(ctx, { group, pages }) {
      let words = [];
      const resPromiseArr = [];
      pages.forEach((page) => {
        const resPromise = fetch(
          `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`
        );
        resPromiseArr.push(resPromise);
      });
      const resArr = await Promise.all(resPromiseArr);
      const wordsPromiseArr = resArr.map((res) => res.json());
      const wordsArr = await Promise.all(wordsPromiseArr);
      for (let i = 0; i < wordsArr.length; i += 1) {
        words = words.concat(wordsArr[i]);
      }
      return words;
    },
    async getPages(ctx, { firstWordNum, learningWordsCount, randomWordsCount }) {
      const firstPage = parseInt(Math.floor(firstWordNum / 20), 10);
      const lastPage = parseInt(
        Math.floor((firstWordNum + learningWordsCount + randomWordsCount) / 20),
        10
      );
      const pages = [];
      for (let i = firstPage; i <= lastPage; i += 1) {
        pages.push(i % 30);
      }
      return pages;
    },
    async getFreeWords({ commit }, { group, firstWordNum, learningWordsCount, randomWordsCount }) {
      commit("setSettings", { group, firstWordNum, learningWordsCount, randomWordsCount });
      const pages = await this.dispatch("getPages", {
        firstWordNum,
        learningWordsCount,
        randomWordsCount,
      });
      const words = await this.dispatch("getFreeWordsByPages", { group, pages });
      const learningWords = words.splice(firstWordNum % 20, learningWordsCount);
      const randomWords = [];
      for (let i = 0; i < randomWordsCount; i += 1) {
        const index = Math.floor(Math.random() * words.length);
        randomWords.push(words.splice(index, 1)[0]);
      }
      commit("setWords", { learningWords, randomWords });
    },
  },
  mutations: {
    setSettings(state, { group, firstWordNum, learningWordsCount, randomWordsCount }) {
      state.apiService.group = group;
      state.apiService.firstWordNum = firstWordNum;
      state.apiService.learningWordsCount = learningWordsCount;
      state.apiService.randomWordsCount = randomWordsCount;
    },
    setWords(state, { learningWords, randomWords }) {
      state.apiService.learningWords = learningWords;
      state.apiService.randomWords = randomWords;
    },
  },
  getters: {
    words(state) {
      return state.apiService;
    },
  },
};
