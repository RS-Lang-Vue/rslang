import apiService from "./api-service";

export default {
  modules: {
    apiService,
  },
  state: {
    ROUND_WORD_COUNT: 20,
    GROUP_COUNT: 6,
    PAGE_COUNT: 30
  },
  actions: {
    async getKeyWords() {
      const { group } = this.state.game.gameSettings;
      const round = this.state.game.gameSettings.nextRound[group];
      let keyWords = [];
      if (round < 30) {
        keyWords = await this.dispatch("getFreeWords", { group, round });
      } else {
        const { user } = this.state.user;
        const userWords = await this.dispatch("getUserWords", { user, group });
        keyWords = [...userWords];
        while (keyWords.length > this.state.game.ROUND_WORD_COUNT) {
          const index = Math.floor(Math.random() * userWords.length);
          keyWords.splice(index, 1);
        }
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
      return randomWords;
    },
  },
  mutations: {
  },
  getters: {
  },
};
