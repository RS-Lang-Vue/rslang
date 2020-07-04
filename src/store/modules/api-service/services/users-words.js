import UniResponse from "../../../../models/UniResponse";
import errorList from "../../../../config/errors";

export default {
  state: {},
  actions: {
    async getUsersWords() {
      const user = await this.dispatch("getUser");
      if (user === undefined) {
        return new UniResponse(false, errorList.unauthorized);
      }
      const url = `${this.state.apiService.baseApiUrl}/users/${user.userId}/words`;
      const res = await fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      });
      switch (res.status) {
        case 200:
          return new UniResponse(true, await res.json());
        case 402:
          return new UniResponse(false, errorList.token);
        default:
          return new UniResponse(false, `${errorList.unknow}. ${res.status} : ${res.statusText}`);
      }
    },
    async getUsersWordsById(ctx, { wordId }) {
      const user = await this.dispatch("getUser");
      if (user === undefined) {
        return new UniResponse(false, errorList.unauthorized);
      }
      const url = `${this.state.apiService.baseApiUrl}/users/${user.userId}/words/${wordId}`;
      const res = await fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      });
      switch (res.status) {
        case 200:
          return new UniResponse(true, await res.json());
        case 401:
          return new UniResponse(false, errorList.token);
        case 404:
          return new UniResponse(true, undefined);
        default:
          return new UniResponse(false, `${errorList.unknow}. ${res.status} : ${res.statusText}`);
      }
    },
    async setUserWords(ctx, { isNewWord, userWord, wordId }) {
      const userWordSend = {
        difficulty: userWord.difficulty,
        optional: userWord.optional,
      };
      const user = await this.dispatch("getUser");
      if (user === undefined) {
        return new Response(false, errorList.unauthorized);
      }
      const url = `${this.state.apiService.baseApiUrl}/users/${user.userId}/words/${wordId}`;
      const method = isNewWord ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userWordSend),
      });
      switch (res.status) {
        case 200:
          return new UniResponse(true, await res.json());
        case 401:
          return new UniResponse(false, errorList.token);
        case 400:
          return new UniResponse(true, errorList.badRequest);
        default:
          return new UniResponse(false, `${errorList.unknow}. ${res.status} : ${res.statusText}`);
      }
    },
  },
  mutations: {},
  getters: {},
};
