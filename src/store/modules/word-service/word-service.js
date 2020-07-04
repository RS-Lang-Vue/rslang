<<<<<<< HEAD
import apiService from "./api-service";
import utils from "../utils/utils";

export default {
  modules: {
    apiService,
  },
=======
import utils from "../utils/utils";
import UniResponse from "../../../models/UniResponse";
import errorList from "../../../config/errors";

export default {
>>>>>>> develop
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
<<<<<<< HEAD
      if (round < this.state.game.PAGE_COUNT) {
        keyWords = await this.dispatch("getFreeWords", { group: level, page: round });
        keyWords = utils.shuffle(keyWords);
      } else {
        const { user } = this.state.user;
        const userWords = await this.dispatch("getUserAggregateWords", { user, group: level });
        keyWords = [...userWords];
        keyWords = utils.shuffle(keyWords);
        keyWords = keyWords.splice(0, this.state.game.ROUND_WORD_COUNT);
        keyWords = keyWords.map((w) => w.optional.word);
      }
      return keyWords;
=======
      const user = await this.dispatch("getUser");
      if (user === undefined) {
        if (round === this.state.game.PAGE_COUNT) {
          return new UniResponse(false, errorList.unauthorized);
        }
        const res = await this.dispatch("getWords", { group: level, page: round });
        keyWords = [...res.result];
        keyWords = utils.shuffle(keyWords);
      } else if (round === this.state.game.PAGE_COUNT) {
        const res = await this.dispatch("getUserAggregateWords", {
          isLearned: true,
          group: level,
        });
        keyWords = [...res.result];
        keyWords = utils.shuffle(keyWords);
        keyWords = keyWords.splice(0, this.state.game.ROUND_WORD_COUNT);
      } else {
        const res = await this.dispatch("getUserAggregateWords", {
          group: level,
        });
        keyWords = [...res.result];
        keyWords = keyWords.splice(
          round * this.state.game.ROUND_WORD_COUNT,
          this.state.game.ROUND_WORD_COUNT
        );
        keyWords = utils.shuffle(keyWords);
      }
      return new UniResponse(true, keyWords);
>>>>>>> develop
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
<<<<<<< HEAD
      const randomWords = await this.dispatch("getFreeWords", { group: level, page: round });
      return utils.shuffle(randomWords);
=======
      let randomWords = [];
      const user = await this.dispatch("getUser");
      if (user === undefined) {
        const res = await this.dispatch("getWords", { group: level, page: round });
        randomWords = [...res.result];
        randomWords = utils.shuffle(randomWords);
      } else {
        const res = await this.dispatch("getUserAggregateWords", {
          isLearned: true,
          group: level,
        });
        randomWords = [...res.result];
        randomWords = utils.shuffle(randomWords);
        randomWords = randomWords.splice(0, this.state.game.ROUND_WORD_COUNT);
      }
      return new UniResponse(true, randomWords);
>>>>>>> develop
    },
  },
  mutations: {},
  getters: {},
};
