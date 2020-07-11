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

      try {
        const resNewWords = await dispatch("getUserAggregateWords", {
          // difficulty: 0 //0 - common words
          page: 0,
          wordsPerPage: newWordsPerDay,
          onlyNotLearned: true,
        });
        console.log("resNewWords >>>", resNewWords);
        if (resNewWords.success) commit("updateNewWordsArray", resNewWords.result);
        else throw new Error("Error loading newWordsArray");

        if (repeatWordsPerDay) {
          const resRepeatWords = await dispatch("getUserAggregateWords", {
            // difficulty: 0 //0 - common words
            page: 0,
            wordsPerPage: repeatWordsPerDay,
            onlyLearned: true,
          });
          console.log("resRepeatWords >>>", resRepeatWords);
          if (resRepeatWords.success) commit("updateRepeatWordsArray", resRepeatWords.result);
          else throw new Error("Error loading repeatWordsArray");
        }
        const mixWordsArray = mixArrays([state.newWordsArray, state.repeatWordsArray]);
        commit("updateMixWordsArray", mixWordsArray);
        state.currentLearnStateObject.isArraysLoaded = true;
      } catch (error) {
        console.error(error.message);
      }
    },
    updateMixWordsArrayObjectByStep({ state }, payload) {
      const { step, currentObject } = payload;
      // todo: send the word object to sever
      state.mixWordsArray[step] = currentObject;
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
    // updatecurrentWordObject(state, payload){
    //    //
    // },
    updateCurrentCardStudied(state, payload) {
      const { value, step } = payload;
      state.mixWordsArray[step].isCardStudied = value;
    },
  },
  getters: {
    getNewWordsArray(state) {
      // return state.newWordsArray;
      return state.mixWordsArray.filter((wordsObject) => !wordsObject.userWord);
    },
    getRepeatWordsArray(state) {
      return state.mixWordsArray.filter((wordsObject) => wordsObject.userWord);
    },
    getMixWordsArray(state) {
      return state.mixWordsArray;
    },
    getCurrentArray(state, getters) {
      if (state.learnType === LEARN_TYPE_NEW) return getters.getNewWordsArray;
      if (state.learnType === LEARN_TYPE_REPEAT) return getters.getRepeatWordsArray;
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
