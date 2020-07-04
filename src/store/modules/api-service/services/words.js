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
      const freeWords = await res.json();
      return freeWords;
    },
  },
  mutations: {},
  getters: {},
};
