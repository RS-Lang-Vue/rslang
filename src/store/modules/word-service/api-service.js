export default {
  actions: {
    async getFreeWordsByPages(ctx, { group, pages }) {
      let words = [];
      const resPromiseArr = [];
      pages.forEach((page) => {
        const resPromise = fetch(
          `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`
        );
        resPromiseArr.push(resPromise);
      });
      const resArr = await Promise.all(resPromiseArr);
      const wordsPromiseArr = resArr.map((res) => res.json());
      const wordsArr = await Promise.all(wordsPromiseArr);
      for (let i = 0; i < wordsArr.length; i += 1) {
        words = words.concat(wordsArr[i]);
      }
      return words;
    },
    async getPages(ctx, { firstWordNum, learningWordsCount, randomWordsCount }) {
      const firstPage = parseInt(Math.floor(firstWordNum / 20), 10);
      const lastPage = parseInt(
        Math.floor((firstWordNum + learningWordsCount + randomWordsCount) / 20),
        10
      );
      const pages = [];
      for (let i = firstPage; i <= lastPage; i += 1) {
        pages.push(i % 30);
      }
      return pages;
    },
    async getFreeWords({ commit }, { group, firstWordNum, learningWordsCount, randomWordsCount }) {
      commit("setSettings", { group, firstWordNum, learningWordsCount, randomWordsCount });
      const pages = await this.dispatch("getPages", {
        firstWordNum,
        learningWordsCount,
        randomWordsCount,
      });
      const words = await this.dispatch("getFreeWordsByPages", { group, pages });
      const learningWords = words.splice(firstWordNum % 20, learningWordsCount);
      const randomWords = [];
      for (let i = 0; i < randomWordsCount; i += 1) {
        const index = Math.floor(Math.random() * words.length);
        randomWords.push(words.splice(index, 1)[0]);
      }
      commit("setWords", { learningWords, randomWords });
    },
    getUserWords({ commit }, { learningWordsCount, randomWordsCount }) {
      const words = this.state.wordService.userWords;
      const learningWords = [];
      for (let i = 0; i < learningWordsCount; i += 1) {
        const index = Math.floor(Math.random() * words.length);
        learningWords.push(words.splice(index, 1)[0]);
      }
      const randomWords = [];
      for (let i = 0; i < randomWordsCount; i += 1) {
        const index = Math.floor(Math.random() * words.length);
        randomWords.push(words.splice(index, 1)[0]);
      }
      commit("setWords", { learningWords, randomWords });
    },
    async downloadUserWords({ commit }, group) {
      const { user } = this.state.user;
      const res = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/aggregatedWords?group=${group}`,
        {
          method: "GET",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );
      const userWords = await res.json();
      commit("setUserWords", userWords);
    },
  },
};
