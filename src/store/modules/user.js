import request from "@/requests/request";
import checkToken from "@/helpers/check-token";

export default {
  state: {
    _user: {
      email: localStorage.getItem("email") || "",
      token: localStorage.getItem("token") || "",
      refreshToken: localStorage.getItem("refreshToken") || "",
      userId: localStorage.getItem("userId") || null,
      tokenReceiptTime: localStorage.getItem("tokenReceiptTime") || "",
    },
  },
  actions: {
    getUser({ state, getters, dispatch }) {
      if (!getters.isLoggedIn) return false;
      if (checkToken.isTokenOutdated()) {
        dispatch("unsetUser");
        return false;
      }
      return state._user;
    },
    createUser(_, user) {
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
      return new Promise((resolve, reject) => {
        request({
          method: "POST",
          url: "signin",
          data: user,
        })
          .then((res) => {
            const { email } = JSON.parse(res.config.data);
            const { token, refreshToken, userId } = res.data;
            const tokenReceiptTime = Date.now();
            localStorage.setItem("email", email);
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("userId", userId);
            localStorage.setItem("tokenReceiptTime", tokenReceiptTime);
            commit("setUser", { email, token, refreshToken, userId, tokenReceiptTime });
            dispatch("downloadSettings");
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async refreshToken({ commit, dispatch }) {
      const user = await dispatch("getUser");
      const res = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/tokens`,
        {
          method: "GET",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.refreshToken}`,
            Accept: "application/json",
          },
        }
      );
      const { token, refreshToken } = await res.json();
      const tokenReceiptTime = Date.now();
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("tokenReceiptTime", tokenReceiptTime);
      user.token = token;
      user.refreshToken = refreshToken;
      user.tokenReceiptTime = tokenReceiptTime;
      commit("setUser", user);
    },
  },
  mutations: {
    setUser(state, user) {
      state._user = user;
    },
    unsetUser(state) {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenReceiptTime");
      state._user.email = "";
      state._user.token = "";
      state._user.refreshToken = "";
      state._user.userId = null;
      state._user.tokenReceiptTime = "";
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state._user.userId;
    },
  },
};
