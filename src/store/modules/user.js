import request from "@/requests/request";
import config from "../../config/config";

export default {
  state: {
    _user: {
      token: localStorage.getItem("token") || "",
      userId: localStorage.getItem("userId") || "",
      tokenReceiptTime: localStorage.getItem("tokenReceiptTime") || "",
    },
  },
  actions: {
    async getUser({ commit }) {
      if (this.state.user._user.userId === "") return undefined;
      const deltaTime = Date.now() - this.state.user._user.tokenReceiptTime;
      if (deltaTime > config.tokenLifetime) {
        commit("unsetUser");
      } else if (deltaTime > config.tokenLifetime / 2) {
        await this.dispatch("refreshToken");
      }
      return this.state.user._user;
    },
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
    async refreshToken() {
      const user = this.state.user._user;
      const res = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/tokens`,
        {
          method: "GET",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );
      const tokens = await res.json();
      this.state.user._user.token = tokens.refreshToken;
      this.state.user._user.tokenReceiptTime = Date.now();
    },
  },
  mutations: {
    setUser(state, user) {
      state._user = user;
    },
    unsetUser(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenReceiptTime");
      state._user.token = "";
      state._user.userId = "";
      state._user.tokenReceiptTime = "";
    },
  },
  getters: {
    isLoggedIn: (state) => {
      if (state._user.userId === "") return false;
      const deltaTime = Date.now() - state._user.tokenReceiptTime;
      return deltaTime < config.tokenLifetime;
    },
  },
};
