import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import userSetting from "./modules/user-setting";
import common from "./modules/common";
import englishPuzzle from "./modules/english-puzzle/english-puzzle";
import wordService from "./modules/word-service/word-service";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    userSetting,
    common,
    englishPuzzle,
    wordService,
  },
});
