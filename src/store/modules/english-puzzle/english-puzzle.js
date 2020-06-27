import words from "./words";
import statistics from "./statistics";

export default {
  modules: {
    words,
    statistics,
  },
  state: {
    hintOptions: {
      showTranslation: true,
      showBackground: true,
      showAudio: true,
      autoPlayAudio: true,
    },
    isUserChangedRound: false,
    sourceCards: [],
    resultsCards: [],
  },
  mutations: {
    updateHintOptionsEP(state, options) {
      state.hintOptions = options;
    },
    updateIsUserChangedRoundEP(state, value) {
      state.isUserChangedRound = value;
    },
    updateSourceCardsEP(state, value) {
      state.sourceCards = value;
    },
    updateResultsCardsEP(state, value) {
      state.resultsCards = value;
    },
  },
  actions: {
    setHintOptionsEP({ commit }, options) {
      commit("updateHintOptionsEP", options);
    },
    setIsUserChangedRoundEP({ commit }, value) {
      commit("updateIsUserChangedRoundEP", value);
    },
    setSourceCardsEP({ commit }, value) {
      const cards = value.map((el) => {
        const item = el;
        item.isCheck = false;
        item.isError = false;
        item.isResults = false;
        return item;
      });
      commit("updateSourceCardsEP", cards);
    },
    setResultsCardsEP({ commit }, value) {
      const cards = value.map((el) => {
        const item = el;
        item.init = false;
        item.isResults = true;
        return item;
      });
      commit("updateResultsCardsEP", cards);
    },
  },
  getters: {
    getHintOptionsEP(state) {
      return state.hintOptions;
    },
    getIsUserChangedRoundEP(state) {
      return state.isUserChangedRound;
    },
    getSourceCardsEP(state) {
      return state.sourceCards;
    },
    getResultsCardsEP(state) {
      return state.resultsCards;
    },
  },
};
