export default {
  actions: {
    async getFreeWords(ctx, { group, round }) {
      const res = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/words?page=${round}&group=${group}`
      );
      const freeWords = await res.json();
      return freeWords;
    },
    async getUserWords(ctx, { user, group }) {
      const url =
        group !== undefined
          ? `https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/aggregatedWords`
          : `https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/aggregatedWords?group=${group}`;
      const res = await fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      });
      const userWords = await res.json();
      return userWords;
    },
  },
};
