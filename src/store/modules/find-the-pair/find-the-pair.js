import words from "./words";
import statistics from "./statistics";
import images from "./images";

export default {
  modules: {
    words,
    statistics,
    images,
  },
  state: {
    settingsFP: {
      level: 0,
      round: [0, 0, 0, 0, 0, 0],
      roundsInLevelCount: 59,
      levelCount: 5,
      audio: true,
      complexity: 0,
      learned: false,
    },
    isUserChangedRoundFP: false,
  },
  mutations: {
    updateSettingsFP(state, options) {
      state.settingsFP = options;
    },
    updateIsUserChangedRoundFP(state, value) {
      state.isUserChangedRoundFP = value;
    },
  },
  actions: {
    setSettingsFP({ commit, dispatch }, options) {
      commit("updateSettingsFP", options);
      dispatch("setUserSettingsEpRootState", options);
    },
    async downloadSettingsFP({ state, commit, dispatch, rootState }) {
      await dispatch("downloadSettings");
      const { optional } = rootState.userSettings;
      const optionalKeys = Object.keys(state.settingsFP).sort();
      let match = true;
      Object.keys(optional.gameOwnGame)
        .sort()
        .forEach((item, index) => {
          if (item !== optionalKeys[index]) match = false;
        });
      if (match) commit("updateSettingsFP", optional.gameOwnGame);
    },
    setUserSettingsEpRootState({ commit, dispatch, rootState }, options) {
      const { userSettings } = rootState;
      userSettings.optional.gameOwnGame = options;
      commit("setUserSettings", userSettings);
      dispatch("uploadSettings");
    },
    setIsUserChangedRoundFP({ commit }, value) {
      commit("updateIsUserChangedRoundFP", value);
    },
  },
  getters: {
    getSettingsFP(state) {
      return state.settingsFP;
    },
    getIsUserChangedRoundFP(state) {
      return state.isUserChangedRoundFP;
    },
  },
};
