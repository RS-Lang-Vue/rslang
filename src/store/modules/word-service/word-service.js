import apiService from "./api-service";
import utils from "../utils/utils";

export default {
  modules: {
    apiService,
  },
  state: {
    ROUND_WORD_COUNT: 20,
    GROUP_COUNT: 6,
    PAGE_COUNT: 30,
  },
  actions: {
    async getKeyWords() {
      const { group } = this.state.game.gameSettings;
      const round = this.state.game.gameSettings.nextRound[group];
      let keyWords = [];
      if (round < 30) {
        keyWords = await this.dispatch("getFreeWords", { group, round });
        keyWords = utils.shuffle(keyWords);
      } else {
        const { user } = this.state.user;
        const userWords = await this.dispatch("getUserAggregateWords", { user, group });
        keyWords = [...userWords];
        keyWords = utils.shuffle(keyWords);
        keyWords = keyWords.splice(0, 20);
        keyWords = keyWords.map((w) => w.optional.word);
      }
      return keyWords;
    },
    async getRandomWords() {
      const keyGroup = this.state.game.gameSettings.group;
      const keyRound = this.state.game.gameSettings.nextRound[keyGroup];
      let group = 0;
      let round = 0;
      do {
        group = Math.floor(Math.random() * this.state.game.GROUP_COUNT);
        round = Math.floor(Math.random() * this.state.game.PAGE_COUNT);
      } while (round === keyRound && group === keyGroup);
      const randomWords = await this.dispatch("getFreeWords", { group, round });
      return utils.shuffle(randomWords);
    },
  },
  mutations: {},
  getters: {},
};
