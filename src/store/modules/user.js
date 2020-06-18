import request from "@/requests/request";

export default {
  state: {
    user: {},
  },
  actions: {
    createUser(ctx, user) {
      return new Promise((resolve, reject) => {
        request({
          method: "POST",
          url: "users",
          data: user,
        })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    loginUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        request({
          method: "POST",
          url: "signin",
          data: user,
        })
          .then((res) => {
            const { token, userId } = res.data;
            commit("setUser", { token, userId });
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  getters: {
    isLoggedIn: (state) => Boolean(state.user.token),
  },
};
