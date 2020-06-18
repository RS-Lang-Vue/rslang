import request from "@/requests/request";

export default {
  state: {
    user: {
      token: localStorage.getItem("token") || "",
      userId: localStorage.getItem("userId") || "",
    },
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
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
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
    unsetUser(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      state.user.token = "";
      state.user.userId = "";
    },
  },
  getters: {
    isLoggedIn: (state) => Boolean(state.user.token),
  },
};
