export default {
  state: {
    statisticSavannah: [],
  },
  actions: {},
  mutations: {
    addSavannahStatistic(state, stat) {
      state.statisticSavannah.push(stat);
    },
  },
  getters: {
    getSavannahStatistic(state) {
      return state.statisticSavannah;
    },
  },
};
