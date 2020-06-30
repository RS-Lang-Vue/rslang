import wordService from "./word-service/word-service";

export default {
  modules: {
    wordService,
  },
  state: {
    ROUND_WORD_COUNT: 20,
    GROUP_COUNT: 6,
    PAGE_COUNT: 30,
    gameName: undefined,
    gameSettings: undefined,
    roundWords: {
      keyWords: [],
      randomWords: [],
    },
  },
  actions: {
    setGame({ commit }, gameName) {
      commit("setGame", gameName);
    },
    setGroup({ commit }, group) {
      commit("setGroup", group);
    },
    async setRound({ commit }, round) {
      if (round >= 30) {
        const { group } = this.state.game.gameSettings;
        const userWords = await this.dispatch("getUserWords", group);
        if (userWords.length < this.state.game.ROUND_WORD_COUNT) return;
      }
      commit("setRound", round);
    },
    async getRoundWords({ commit }, needRandom = true) {
      const keyWords = await this.dispatch("getKeyWords");
      const randomWords = needRandom ? await this.dispatch("getRandomWords") : [];
      commit("setRoundWords", { keyWords, randomWords });
    },
    compliteRound({ commit }) {
      const { group } = this.state.game.gameSettings;
      if (this.state.game.gameSettings.nextRound[group] === this.state.game.PAGE_COUNT - 1) {
        return;
      }
      commit("compliteRound");
      const { gameName } = this.state.game;
      const { gameSettings } = this.state.game;
      this.dispatch("setGameSetting", { gameName, gameSettings });
    },
  },
  mutations: {
    setGame(state, gameName) {
      state.gameName = gameName;
      state.gameSettings = this.state.userSettings.optional[gameName];
    },
    setGroup(state, group) {
      state.gameSettings.group = group;
    },
    setRound(state, round) {
      const { group } = state.gameSettings;
      state.gameSettings.nextRound[group] = round;
    },
    setRoundWords(state, { keyWords, randomWords }) {
      state.roundWords = { keyWords, randomWords };
    },
    compliteRound(state) {
      let { group } = state.gameSettings;
      let round = state.gameSettings.nextRound[group];
      round += 1;
      state.gameSettings.nextRound[group] = round;
      if (round === state.PAGE_COUNT - 1 && group < state.GROUP_COUNT) {
        group += 1;
        state.gameSettings.group = group;
      }
    },
  },
  getters: {
    roundWords(state) {
      return state.roundWords;
    },
    currentGroup(state) {
      return state.gameSettings.group;
    },
    currentRound(state) {
      const { group } = state.gameSettings;
      return state.gameSettings.nextRound[group];
    },
  },
};
