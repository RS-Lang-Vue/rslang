const learnTypeArray = ["all", "new", "repeat"];

export default {
  state: {
    learnType: 0, // 0-all, 1-new, 2-repeat
  },
  actions: {},
  mutations: {
    updateLearnType(state, type) {
      let numberType = 0;
      if (type === learnTypeArray[1]) numberType = 1;
      if (type === learnTypeArray[2]) numberType = 2;
      state.learnType = numberType;
    },
    // addSavannahStatistic(state, stat) {
    //   state.statisticSavannah.push(stat);
    // },
  },
  getters: {
    getLearnType(state) {
      return learnTypeArray[state.learnType];
    },
  },
};
