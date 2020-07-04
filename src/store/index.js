import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import userSettings from "./modules/user-settings";
import common from "./modules/common";
import game from "./modules/game";
<<<<<<< HEAD
=======
import apiService from "./modules/api-service/api-service";
import wordHelper from "./modules/word-helper";
>>>>>>> develop

import englishPuzzle from "./modules/english-puzzle/english-puzzle";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    userSettings,
    game,
    common,
    englishPuzzle,
<<<<<<< HEAD
=======
    apiService,
    wordHelper,
>>>>>>> develop
  },
});
