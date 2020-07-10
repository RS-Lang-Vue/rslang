import { LEARN_TYPE_ALL, LEARN_TYPE_NEW, LEARN_TYPE_REPEAT } from "@/config/constants";
import mixArrays from "@/store/modules/utils/utilsForLearn";
import defaultNewWordsArray from "./defaultObject";

export default {
  state: {
    currentLearnStateObject: {
      isInProgressLearn: false,
      isTaskCompleted: false,
      isArraysLoaded: false,
      step: 0,
    },
    learnType: LEARN_TYPE_ALL,

    newWordsArray: defaultNewWordsArray,
    repeatWordsArray: [],
    mixWordsArray: [],
  },
  actions: {
    async getLearnArraysFromServer({ dispatch, commit, state, rootState }) {
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

      if (repeatWordsPerDay) {
        const resRepeatWords = await dispatch("getUserAggregateWords", {
          page: 0,
          wordsPerPage: repeatWordsPerDay,
          onlyLearned: true,
        });
        console.log("resRepeatWords >>>", resRepeatWords);

        if (resNewWords.success) commit("updateNewWordsArray", resNewWords.result);
        if (resRepeatWords.success) commit("updateRepeatWordsArray", resRepeatWords.result);
        if (resNewWords.success && resRepeatWords.success) {
          const mixWordsArray = mixArrays([state.newWordsArray, state.repeatWordsArray]);
          commit("updateMixWordsArray", mixWordsArray);
          state.currentLearnStateObject.isArraysLoaded = true;
        }
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
    updateMixWordsArray(state, mixWordsArray) {
      state.mixWordsArray = mixWordsArray;
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
      return state.mixWordsArray;
    },
    getCurrentArray(state) {
      if (state.learnType === LEARN_TYPE_NEW) return state.newWordsArray;
      if (state.learnType === LEARN_TYPE_REPEAT) return state.repeatWordsArray;
      return state.mixWordsArray;
    },
    getLearnType(state) {
      return state.learnType;
    },
    getCurrentLearnStateObject(state) {
      return state.currentLearnStateObject;
    },
  },
};
