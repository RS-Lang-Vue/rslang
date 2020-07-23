import UniResponse from "@/models/UniResponse";
import errorList from "@/config/errors";
import config from "@/config/config";

export default {
  state: {},
  actions: {
    async getUserAggregateWords(
      { dispatch },
      { group, page, wordsPerPage = 3600, onlyLearned = false, onlyNotLearned = false, difficulty }
    ) {
      let _onlyLearned = onlyLearned;
      let _onlyNotLearned = onlyNotLearned;
      if (_onlyLearned && _onlyNotLearned) {
        _onlyLearned = false;
        _onlyNotLearned = false;
      }
      if (difficulty !== undefined) {
        _onlyLearned = true;
      }
      const user = await dispatch("getUser");
      if (!user) {
        return new UniResponse(false, errorList.unauthorized);
      }
      let url = `${this.state.apiService.baseApiUrl}/users/${user.userId}/aggregatedWords?`;
      url += `wordsPerPage=${wordsPerPage}`;
      if (group !== undefined) url += `&group=${group}`;
      if (page !== undefined) url += `&page=${page}`;
      if ((_onlyLearned || _onlyNotLearned) && !(_onlyLearned && _onlyNotLearned)) {
        if (_onlyLearned) {
          if (difficulty !== undefined) {
            url += `&filter={"$and":[{"userWord":{"$exists":true}},{"userWord.difficulty":"${difficulty}"}]}`;
          } else {
            url += `&filter={"userWord":{"$exists":true}}`;
          }
        } else {
          url += `&filter={"userWord":null}`;
        }
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
        const jsonRes = await res.json();
        const array = jsonRes[0].paginatedResults;
        const result = new UniResponse(true, array);
        result.add = { totalCount: jsonRes[0].totalCount[0]?.count ?? 0 };
        return result;
      }
      switch (res.status) {
        case 401:
          return new UniResponse(false, errorList.token);
        default:
          return new UniResponse(false, `${errorList.unknow}. ${res.status} : ${res.statusText}`);
      }
    },
    async getUsersAggregateWordsById({ dispatch }, id) {
      const user = await dispatch("getUser");
      if (!user) {
        return new UniResponse(false, errorList.unauthorized);
      }
      const url = `${config.apiBaseUrl}users/${user.userId}/aggregatedWords/${id}`;
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
          return new UniResponse(true, (await res.json())[0]);
        case 401:
          return new UniResponse(false, errorList.token);
        case 404:
          return new UniResponse(true, undefined);
        default:
          return new UniResponse(false, `${errorList.unknow}. ${res.status} : ${res.statusText}`);
      }
    },
  },
  mutations: {},
  getters: {},
};
