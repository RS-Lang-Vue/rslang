import config from "@/config/config";

const BASE_WORDS_URL = `${config.apiBaseUrl}words`;

export default {
  state: {
    words: [
      {
        id: "",
        group: 0,
        page: 0,
        word: "",
        image: "",
        audio: "",
        audioMeaning: "",
        audioExample: "",
        textMeaning: "",
        textExample: "",
        textExampleTranslate: "",
        transcription: "",
      },
    ],
    optionsEP: {
      group: 0,
      page: 0,
      numOfPagesInGroup: 0,
      numOfGroups: 5,
    },
  },
  mutations: {
    updateWordsForRoundEP(state, words) {
      state.words = words;
    },
    updateOptionsEP(state, options) {
      state.optionsEP = options;
      localStorage.setItem("englishPuzzleRounds", JSON.stringify(options));
    },
  },
  actions: {
    async fetchWordsForRoundEP({ commit, dispatch }, options) {
      dispatch("clearError");
      dispatch("setLoading", true);
      const { page, group } = options;
      const url = `${BASE_WORDS_URL}?page=${page}&group=${group}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Words were not received from the server`);
        }
        const data = await res.json();
        commit("updateWordsForRoundEP", data);
        dispatch("setLoading", false);
      } catch (err) {
        dispatch("setLoading", false);
        dispatch("setError", err.message);
        throw err;
      }
    },
    async fetchWordByIdEP({ dispatch }, id) {
      dispatch("clearError");
      dispatch("setLoading", true);
      const url = `${BASE_WORDS_URL}/${id}`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Word were not received from the server`);
        }
        dispatch("setLoading", false);
        return await res.json();
      } catch (err) {
        dispatch("setLoading", false);
        dispatch("setError", err.message);
        throw err;
      }
    },
    async fetchRoundsPerLevelCountEP({ dispatch }, group) {
      dispatch("clearError");
      dispatch("setLoading", true);
      const url = `${BASE_WORDS_URL}/count?group=${group}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`No connection to server`);
        }
        const data = await res.json();
        dispatch("setLoading", false);
        return data.count - 1;
      } catch (err) {
        dispatch("setLoading", false);
        dispatch("setError", err.message);
        throw err;
      }
    },
    setOptionsEP({ commit }, options) {
      commit("updateOptionsEP", options);
    },
  },
  getters: {
    getWordsForRoundEP(state) {
      return state.words;
    },
    getOptionsEP(state) {
      return state.optionsEP;
    },
  },
  modules: {},
};
