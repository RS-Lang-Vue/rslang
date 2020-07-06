import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import gameAudioCall from "./modules/gameAudioCall";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    gameAudioCall,
  },
});
