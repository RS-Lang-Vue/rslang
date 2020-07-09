import mixArrays from "@/store/modules/utils/utilsForLearn";
import defaultNewWordsArray from "./defaultObject";

const LEARN_TYPE_ALL = "all";
const LEARN_TYPE_NEW = "new";
const LEARN_TYPE_REPEAT = "repeat";

export default {
  state: {
    learnType: LEARN_TYPE_ALL,
    newWordsArray: defaultNewWordsArray,
    repeatWordsArray: {},
  },
  actions: {},
  mutations: {
    updateLearnType(state, type) {
      let newType = LEARN_TYPE_ALL;
      if (type === LEARN_TYPE_NEW) newType = LEARN_TYPE_NEW;
      if (type === LEARN_TYPE_REPEAT) newType = LEARN_TYPE_REPEAT;
      state.learnType = newType;
    },
  },
  getters: {
    getMixWordsArray(state) {
      console.log(state);
      const mixWordsArray = mixArrays([state.newWordsArray, state.repeatWordsArray]);
      return mixWordsArray;
    },
    getCurrentArray() {
      // todo
    },
    getLearnType(state) {
      return state.learnType;
    },
  },
};
