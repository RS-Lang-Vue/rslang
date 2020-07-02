export default {
  actions: {
    async getFreeWords(ctx, { group, page }) {
      const res = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`
      );
      const freeWords = await res.json();
      return freeWords;
    },
    async getUserWords(ctx, { user }) {
      const url = `https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/words`;
      const res = await fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      });
      if (res.status === 204) {
        return [];
      }
      const userWords = await res.json();
      return userWords;
    },
    async getUserAggregateWords(ctx, { user, group, maxCount = 20 }) {
      const url = `https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/aggregatedWords?group=${group}&wordsPerPage=${maxCount}`;
      const res = await fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      });
      if (res.status === 204) {
        return [];
      }
      const userWords = await res.json();
      return userWords[0].paginatedResults;
    },
    async setUserWords(ctx, { isNewWord, user, userWord, wordId }) {
      const url = `https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/words/${wordId}`;
      const method = isNewWord ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userWord),
      });
      return res.ok;
    },
    async getUserWordById(ctx, { user, wordId }) {
      const url = `https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/words/${wordId}`;
      const res = await fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      });
      if (res.status === 204) {
        return [];
      }
      const userWord = await res.json();
      return userWord;
    },
  },
};
