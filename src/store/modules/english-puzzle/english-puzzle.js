import words from "./words";
import statistics from "./statistics";

export default {
  modules: {
    words,
    statistics,
  },
  state: {
    settingsEP: {
      level: 0,
      round: [0, 0, 0, 0, 0, 0],
      roundsInLevelCount: 0,
      levelCount: 5,
      hints: {
        translation: true,
        showBackground: true,
        speak: true,
        speakAuto: true,
      },
    },
    isUserChangedRoundEP: false,
    sourceCards: [],
    resultsCards: [],
  },
  mutations: {
    updateSettingsEP(state, options) {
      state.settingsEP = options;
    },
    updateIsUserChangedRoundEP(state, value) {
      state.isUserChangedRoundEP = value;
    },
    updateSourceCardsEP(state, value) {
      state.sourceCards = value;
    },
    updateResultsCardsEP(state, value) {
      state.resultsCards = value;
    },
    updateRoundsPerLevelCountEP(state, value) {
      state.settingsEP.roundsInLevelCount = value;
    },
  },
  actions: {
    setSettingsEP({ commit, dispatch }, options) {
      commit("updateSettingsEP", options);
      dispatch("setUserSettingsEpRootState", options);
    },
    async downloadSettingsEP({ state, commit, getters, dispatch, rootState }) {
      if (getters.isLoggedIn) {
        await dispatch("downloadSettings");
      }
      const { optional } = rootState.userSettings;
      const optionalKeys = Object.keys(state.settingsEP).sort();
      let match = true;
      Object.keys(optional.gamePuzzle)
        .sort()
        .forEach((item, index) => {
          if (item !== optionalKeys[index]) match = false;
        });
      if (match) commit("updateSettingsEP", optional.gamePuzzle);
    },
    setUserSettingsEpRootState({ commit, dispatch, getters, rootState }, options) {
      const { userSettings } = rootState;
      userSettings.optional.gamePuzzle = options;
      commit("setUserSettings", userSettings);
      if (getters.isLoggedIn) {
        dispatch("uploadSettings");
      }
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
    getSettingsEP(state) {
      return state.settingsEP;
    },
    getIsUserChangedRoundEP(state) {
      return state.isUserChangedRoundEP;
    },
    getSourceCardsEP(state) {
      return state.sourceCards;
    },
    getResultsCardsEP(state) {
      return state.resultsCards;
    },
  },
};
