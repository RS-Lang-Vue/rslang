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
  },
  mutations: {
    updateWordsForRoundEP(state, words) {
      state.words = words;
    },
  },
  actions: {
    async fetchWordsForRoundEP({ commit, dispatch }, options) {
      dispatch("clearError");
      dispatch("setLoading", true);
      const { round, level } = options;
      const page = round[level];
      const url = `${BASE_WORDS_URL}?page=${page}&group=${level}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Нет связи с сервером. Слова не были получены`);
        }
        const data = await res.json();
        commit("updateWordsForRoundEP", data);
        dispatch("setLoading", false);
      } catch (err) {
        dispatch("setLoading", false);
        dispatch("setError", err.message);
      }
    },
    async fetchWordByIdEP({ dispatch }, id) {
      dispatch("clearError");
      dispatch("setLoading", true);
      const url = `${BASE_WORDS_URL}/${id}`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Нет связи с сервером. Слова не были получены`);
        }
        const data = await res.json();
        dispatch("setLoading", false);
        return data;
      } catch (err) {
        dispatch("setLoading", false);
        dispatch("setError", err.message);
        throw err;
      }
    },
    async fetchRoundsPerLevelCountEP({ commit, dispatch }, group) {
      dispatch("clearError");
      dispatch("setLoading", true);
      const url = `${BASE_WORDS_URL}/count?group=${group}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Нет связи с сервером`);
        }
        const data = await res.json();
        const value = data.count - 1;
        commit("updateRoundsPerLevelCountEP", value);
        dispatch("setLoading", false);
      } catch (err) {
        dispatch("setLoading", false);
        dispatch("setError", err.message);
        throw err;
      }
    },
  },
  getters: {
    getWordsForRoundEP(state) {
      return state.words;
    },
  },
  modules: {},
};
