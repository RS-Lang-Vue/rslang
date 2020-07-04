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
<<<<<<< HEAD
    optionsEP: {
      group: 0,
      page: 0,
      numOfPagesInGroup: 0,
      numOfGroups: 5,
    },
=======
>>>>>>> develop
  },
  mutations: {
    updateWordsForRoundEP(state, words) {
      state.words = words;
    },
<<<<<<< HEAD
    updateOptionsEP(state, options) {
      state.optionsEP = options;
      localStorage.setItem("englishPuzzleRounds", JSON.stringify(options));
    },
=======
>>>>>>> develop
  },
  actions: {
    async fetchWordsForRoundEP({ commit, dispatch }, options) {
      dispatch("clearError");
      dispatch("setLoading", true);
<<<<<<< HEAD
      const { page, group } = options;
      const url = `${BASE_WORDS_URL}?page=${page}&group=${group}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
=======
      const { round, level } = options;
      const page = round[level];
      const url = `${BASE_WORDS_URL}?page=${page}&group=${level}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
>>>>>>> develop
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
<<<<<<< HEAD
        dispatch("setLoading", false);
        return await res.json();
=======
        const data = await res.json();
        dispatch("setLoading", false);
        return data;
>>>>>>> develop
      } catch (err) {
        dispatch("setLoading", false);
        dispatch("setError", err.message);
        throw err;
      }
    },
<<<<<<< HEAD
    async fetchRoundsPerLevelCountEP({ dispatch }, group) {
=======
    async fetchRoundsPerLevelCountEP({ commit, dispatch }, group) {
>>>>>>> develop
      dispatch("clearError");
      dispatch("setLoading", true);
      const url = `${BASE_WORDS_URL}/count?group=${group}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`No connection to server`);
        }
        const data = await res.json();
<<<<<<< HEAD
        dispatch("setLoading", false);
        return data.count - 1;
=======
        const value = data.count - 1;
        commit("updateRoundsPerLevelCountEP", value);
        dispatch("setLoading", false);
>>>>>>> develop
      } catch (err) {
        dispatch("setLoading", false);
        dispatch("setError", err.message);
        throw err;
      }
    },
<<<<<<< HEAD
    setOptionsEP({ commit }, options) {
      commit("updateOptionsEP", options);
    },
=======
>>>>>>> develop
  },
  getters: {
    getWordsForRoundEP(state) {
      return state.words;
    },
<<<<<<< HEAD
    getOptionsEP(state) {
      return state.optionsEP;
    },
=======
>>>>>>> develop
  },
  modules: {},
};
