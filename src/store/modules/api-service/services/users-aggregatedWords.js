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
      let _onlyLearned = onlyLearned;
      let _onlyNotLearned = onlyNotLearned;
      if (_onlyLearned && _onlyNotLearned) {
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
      if (page !== 0) {
        url += "wordsPerPage=3600";
      } else {
        url += `wordsPerPage=${wordsPerPage}`;
      }
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
  mutations: {},
  getters: {},
};
