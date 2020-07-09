import { LEARN_TYPE_ALL, LEARN_TYPE_NEW, LEARN_TYPE_REPEAT } from "@/config/constants";
import mixArrays from "@/store/modules/utils/utilsForLearn";
import defaultNewWordsArray from "./defaultObject";

export default {
  state: {
    learnType: LEARN_TYPE_ALL,
    newWordsArray: defaultNewWordsArray,
    repeatWordsArray: [],
  },
  actions: {
    async getLearnArraysFromServer({ dispatch, commit, rootState }) {
      const { wordsPerDay } = rootState.userSettings.optional.learn;
      const { newWordsPerDay } = rootState.userSettings.optional.learn;
      const repeatWordsPerDay = wordsPerDay - newWordsPerDay;
      console.log("wordsPerDay:", wordsPerDay, "newWordsPerDay: ", newWordsPerDay);

      const resNewWords = await dispatch("getUserAggregateWords", {
        page: 0,
        wordsPerPage: newWordsPerDay,
        onlyNotLearned: true,
      });
      console.log("resNewWords >>>", resNewWords);
      if (resNewWords.success) commit("updateNewWordsArray", resNewWords.result);

      if (repeatWordsPerDay) {
        const resRepeatWords = await dispatch("getUserAggregateWords", {
          page: 0,
          wordsPerPage: repeatWordsPerDay,
          onlyLearned: true,
        });
        console.log("resRepeatWords >>>", resRepeatWords);
        if (resRepeatWords.success) commit("updateRepeatWordsArray", resRepeatWords.result);
      }
    },
  },
  mutations: {
    updateLearnType(state, type) {
      let newType = LEARN_TYPE_ALL;
      if (type === LEARN_TYPE_NEW) newType = LEARN_TYPE_NEW;
      if (type === LEARN_TYPE_REPEAT) newType = LEARN_TYPE_REPEAT;
      state.learnType = newType;
    },
    updateNewWordsArray(state, newWordsArray) {
      state.newWordsArray = newWordsArray;
    },
    updateRepeatWordsArray(state, repeatWordsArray) {
      state.repeatWordsArray = repeatWordsArray;
    },
  },
  getters: {
    getNewWordsArray(state) {
      return state.newWordsArray;
    },
    getRepeatWordsArray(state) {
      return state.repeatWordsArray;
    },
    getMixWordsArray(state) {
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
