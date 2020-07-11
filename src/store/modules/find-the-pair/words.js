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
    updateWordsForRoundFP(state, words) {
      state.words = words;
    },
  },
  actions: {
    async fetchWordsForRoundFP({ commit, dispatch }, options) {
      dispatch("clearError");
      dispatch("setLoading", true);
      const { round, level } = options;
      const page = round[level];
      const url = `${BASE_WORDS_URL}?page=${page}&group=${level}&wordsPerExampleSentenceLTE=25&wordsPerPage=10`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Слова не были получены с сервера`);
        }
        const data = await res.json();
        commit("updateWordsForRoundFP", data);
        dispatch("setLoading", false);
      } catch (err) {
        dispatch("setLoading", false);
        dispatch("setError", err.message);
      }
    },
    async fetchWordByIdFP({ dispatch }, id) {
      dispatch("clearError");
      dispatch("setLoading", true);
      const url = `${BASE_WORDS_URL}/${id}`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Слова не были получены с сервера`);
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
  },
  getters: {
    getWordsForRoundFP(state) {
      return state.words;
    },
  },
  modules: {},
};
