import request from "@/requests/request";

export default {
  state: {
    user: {
      token: localStorage.getItem("token") || "",
      userId: localStorage.getItem("userId") || "",
      tokenReceiptTime: localStorage.getItem("tokenReceiptTime") || "",
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
    loginUser({ commit, dispatch }, user) {
      dispatch("setLoading", true);
      return new Promise((resolve, reject) => {
        request({
          method: "POST",
          url: "signin",
          data: user,
        })
          .then((res) => {
            const { token, userId } = res.data;
            const tokenReceiptTime = Date.now();
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("tokenReceiptTime", tokenReceiptTime);
            commit("setUser", { token, userId, tokenReceiptTime });
            dispatch("downloadSettings");
            dispatch("setLoading", false);
            resolve(res);
          })
          .catch((err) => {
            dispatch("setLoading", false);
            reject(err);
          });
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
      localStorage.removeItem("tokenReceiptTime");
      state.user.token = "";
      state.user.userId = "";
      state.user.tokenReceiptTime = "";
    },
  },
  getters: {
    isLoggedIn: (state) => Boolean(state.user.token),
  },
};
