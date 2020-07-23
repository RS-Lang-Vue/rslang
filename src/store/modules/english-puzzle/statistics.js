export default {
  state: {
    statistics: [],
  },
  mutations: {
    updateStatisticsEP(state, statistics) {
      state.statistics = statistics;
    },
  },
  actions: {
    setStatisticsEP({ commit }, statistics) {
      commit("updateStatisticsEP", statistics);
    },
  },
  getters: {
    getStatisticsEP(state) {
      return state.statistics;
    },
  },
};
