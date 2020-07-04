import UniResponse from "../../../../models/UniResponse";
import errorList from "../../../../config/errors";

export default {
  state: {},
  actions: {
    async getWords(
      ctx,
      {
        group = undefined,
        page = undefined,
        wordsPerPage = 20,
        wordsPerExampleSentenceLTE = undefined,
      }
    ) {
      let url = `${this.state.apiService.baseApiUrl}/words?`;
      url += `wordsPerPage=${wordsPerPage}`;
      if (group !== undefined) url += `&group=${group}`;
      if (page !== undefined) url += `&page=${page}`;
      if (wordsPerExampleSentenceLTE !== undefined)
        url += `&wordsPerExampleSentenceLTE=${wordsPerExampleSentenceLTE}`;
      const res = await fetch(url);
      switch (res.status) {
        case 200:
          return new UniResponse(true, await res.json());
        default:
          return new UniResponse(false, `${errorList.unknow}. ${res.status} : ${res.statusText}`);
      }
    },
  },
  mutations: {},
  getters: {},
};
