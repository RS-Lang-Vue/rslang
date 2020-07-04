import wordService from "./word-service/word-service";
import UniResponse from "../../models/UniResponse";

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
    setGroup({ commit }, level) {
      commit("setGroup", level);
    },
    async setRound({ commit }, round) {
      if (round >= 30) {
        const { level } = this.state.game.gameSettings;
        const res = await this.dispatch("getUsersAggregatedWords", level);
        const userWords = res.result;
        if (userWords.length < this.state.game.ROUND_WORD_COUNT) return;
      }
      commit("setRound", round);
    },
    async getRoundWords({ commit }, needRandom = true) {
      let res = await this.dispatch("getKeyWords");
      if (!res.success) return res;
      const keyWords = res.result;

      if (needRandom) res = await this.dispatch("getRandomWords");
      if (!res.success) return res;
      const randomWords = needRandom ? res.result : [];
      commit("setRoundWords", { keyWords, randomWords });
      return new UniResponse(true, { keyWords, randomWords });
    },
    compliteRound({ commit }) {
      const { level } = this.state.game.gameSettings;
      if (this.state.game.gameSettings.nextRound[level] === this.state.game.PAGE_COUNT - 1) {
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
    setGroup(state, level) {
      state.gameSettings.level = level;
    },
    setRound(state, round) {
      const { level } = state.gameSettings;
      state.gameSettings.nextRound[level] = round;
    },
    setRoundWords(state, { keyWords, randomWords }) {
      state.roundWords = { keyWords, randomWords };
    },
    compliteRound(state) {
      let { level } = state.gameSettings;
      let round = state.gameSettings.round[level];
      round += 1;
      state.gameSettings.round[level] = round;
      if (round === state.PAGE_COUNT - 1 && level < state.LEVEL_COUNT) {
        level += 1;
        state.gameSettings.level = level;
      } else {
        state.gameSettings.nextRound[level] = round;
      }
    },
  },
  getters: {
    roundWords(state) {
      return state.roundWords;
    },
    currentLevel(state) {
      if (state.gameSettings === undefined) return undefined;
      return state.gameSettings.level;
    },
    currentRound(state) {
      if (state.gameSettings === undefined) return undefined;
      const { level } = state.gameSettings;
      return state.gameSettings.round[level];
    },
  },
};
