import UniResponse from "../../../../models/UniResponse";
import errorList from "../../../../config/errors";

export default {
  state: {},
  actions: {
    async getUserAggregateWords(
      ctx,
      {
        group = undefined,
        page = undefined,
        wordsPerPage = 3600,
        onlyLearned = false,
        onlyNotLearned = false,
        difficulty = undefined,
      }
    ) {
      let _onlyLearned = false;
      let _onlyNotLearned = false;
      if (onlyLearned && onlyNotLearned) {
        _onlyLearned = false;
        _onlyNotLearned = false;
      }
      if (difficulty !== undefined) {
        _onlyLearned = true;
      }
      const user = await this.dispatch("getUser");
      if (user === undefined) {
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
  },
  mutations: {},
  getters: {},
};
