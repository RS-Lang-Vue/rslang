import words from "./words";

export default {
  modules: {
    words,
  },
  state: {
    settingsFP: {
      level: 0,
      round: [0, 0, 0, 0, 0, 0],
      roundsInLevelCount: 59,
      levelCount: 5,
    },
    isUserChangedRound: false,
  },
  mutations: {
    updateSettingsFP(state, options) {
      state.settingsFP = options;
    },
    updateIsUserChangedRoundFP(state, value) {
      state.isUserChangedRound = value;
    },
  },
  actions: {
    setSettingsFP({ commit, dispatch }, options) {
      commit("updateSettingsFP", options);
      dispatch("setUserSettingsEpRootState", options);
    },
    async downloadSettingsFP({ commit, dispatch, rootState }) {
      await dispatch("downloadSettings");
      const { optional } = rootState.userSettings;
      commit("updateSettingsFP", optional.gameFindThePair);
    },
    setUserSettingsEpRootState({ commit, dispatch, rootState }, options) {
      const { userSettings } = rootState;
      userSettings.optional.gameFindThePair = options;
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
      return state.isUserChangedRound;
    },
  },
};
