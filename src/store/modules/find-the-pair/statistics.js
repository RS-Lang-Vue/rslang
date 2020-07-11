export default {
  state: {
    statistics: [],
  },
  mutations: {
    updateStatisticsFP(state, statistics) {
      state.statistics = statistics;
    },
  },
  actions: {
    setStatisticsFP({ commit }, statistics) {
      commit("updateStatisticsFP", statistics);
    },
  },
  getters: {
    getStatisticsFP(state) {
      return state.statistics;
    },
  },
};
