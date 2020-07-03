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
      const { level } = this.state.game.gameSettings;
      const round = this.state.game.gameSettings.round[level];
      let keyWords = [];
      if (round < this.state.game.PAGE_COUNT) {
        keyWords = await this.dispatch("getFreeWords", { group: level, page: round });
        keyWords = utils.shuffle(keyWords);
      } else {
        const { user } = this.state.user;
        const userWords = await this.dispatch("getUserAggregateWords", { user, isLearned: true, group: level });
        keyWords = [...userWords];
        keyWords = utils.shuffle(keyWords);
        keyWords = keyWords.splice(0, this.state.game.ROUND_WORD_COUNT);
        keyWords = keyWords.map((w) => w.optional.word);
      }
      return keyWords;
    },
    async getRandomWords() {
      const keyLevel = this.state.game.gameSettings.level;
      const keyRound = this.state.game.gameSettings.round[keyLevel];
      let level = 0;
      let round = 0;
      do {
        level = Math.floor(Math.random() * this.state.game.GROUP_COUNT);
        round = Math.floor(Math.random() * this.state.game.PAGE_COUNT);
      } while (round === keyRound && level === keyLevel);
      const randomWords = await this.dispatch("getFreeWords", { group: level, page: round });
      return utils.shuffle(randomWords);
    },
  },
  mutations: {},
  getters: {},
};
