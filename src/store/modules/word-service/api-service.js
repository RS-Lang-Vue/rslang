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
    async getFreeWordsPromise({ commit }, { group, pages }) {
      commit('setSettings', { group, pages});
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
      commit("setWords", words);
    },
  },
  mutations: {
    setSettings(state, { group, pages }) {
        state.apiService.group = group;
        state.apiService.firstWordNum = pages[0] * 20;
        state.apiService.learningWordsCount = pages.length * 20;        
    },
    setWords(state, words) {
        state.apiService.learningWords = words;
    },
  },
  getters: {
    words(state) {
      return state.apiService.learningWords;
    },
  },
};
