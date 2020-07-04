import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import userSettings from "./modules/user-settings";
import common from "./modules/common";
import game from "./modules/game";
import apiService from "./modules/api-service/api-service";
import wordHelper from "./modules/word-helper";

import englishPuzzle from "./modules/english-puzzle/english-puzzle";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    userSettings,
    game,
    common,
    englishPuzzle,
    apiService,
    wordHelper,
  },
});
