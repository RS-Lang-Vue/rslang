import UniResponse from "../../../../models/UniResponse";
import errorList from "../../../../config/errors";

export default {
  state: {
    localUserWords: undefined,
  },
  actions: {
    async getLocalUserWords() {
      if (this.state.user._user.userId === "") return UniResponse(false, errorList.unauthorized);
      let words = [];
      if (this.state.apiService.users.aggregatedWords.localUserWords === undefined) {
        const res = await this.dispatch("downloadUserAggregateWords");
        if (!res.success) return res;
        words = res.result;
      } else words = this.state.apiService.users.aggregatedWords.localUserWords;
      const result = new UniResponse(true, words);
      return result;
    },
    async downloadUserAggregateWords({ commit }) {
      console.log("downloadUserAggregateWords start");
      const user = await this.dispatch("getUser");
      if (user === undefined) {
        return new UniResponse(false, errorList.unauthorized);
      }
      const url = `${this.state.apiService.baseApiUrl}/users/${user.userId}/aggregatedWords?wordsPerPage=3600}`;
      const res = await fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      });
      console.log("downloadUserAggregateWords res", res);
      if (res.status === 200) {
        const json = await res.json();
        console.log("downloadUserAggregateWords json", json);
        const array = json[0].paginatedResults;
        console.log("downloadUserAggregateWords array", array);
        commit("setUserAggregateWords", array);
        console.log("downloadUserAggregateWords", array);
        return new UniResponse(true, array);
      }
      console.log("downloadUserAggregateWords failed");
      switch (res.status) {
        case 401:
          return new UniResponse(false, errorList.token);
        default:
          return new UniResponse(false, `${errorList.unknow}. ${res.status} : ${res.statusText}`);
      }
    },
    async getUserAggregateWords(
      ctx,
      {
        group = undefined,
        page = undefined,
        wordsPerPage = 3600,
        onlyLearned = false,
        onlyNotLearned = false,
      }
    ) {
      const user = await this.dispatch("getUser");
      if (user === undefined) {
        return new UniResponse(false, errorList.unauthorized);
      }
      let url = `${this.state.apiService.baseApiUrl}/users/${user.userId}/aggregatedWords?wordsPerPage=3600}`;
      if (group !== undefined) url += `&group=${group}`;
      if (page !== undefined) url += `&page=${page}`;
      if ((onlyLearned || onlyNotLearned) && !(onlyLearned && onlyNotLearned)) {
        url += onlyLearned ? `&filter={"userWord":{"$exists":true}}` : `&filter={"userWord":null}`;
      }
      const res = await fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      });
      if (res.status === 200) {
        let array = (await res.json())[0].paginatedResults;
        if (page !== undefined && array.length < page * wordsPerPage) {
          return new UniResponse(
            false,
            `${errorList.pageNotFound}. Все изучено слов - ${array.length}`
          );
        }
        array = array.splice(page * wordsPerPage, wordsPerPage);
        return new UniResponse(true, array);
      }
      switch (res.status) {
        case 401:
          return new UniResponse(false, errorList.token);
        default:
          return new UniResponse(false, `${errorList.unknow}. ${res.status} : ${res.statusText}`);
      }
    },
  },
  mutations: {
    setUserAggregateWords(state, words) {
      this.state.apiService.users.aggregatedWords.localUserWords = words;
    },
  },
  getters: {},
};
