import axios from "axios";

export default {
  state: {
    user: {},
  },
  actions: {
    createUser(ctx, user) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: "https://afternoon-falls-25894.herokuapp.com/users",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: user,
        })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    loginUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: "https://afternoon-falls-25894.herokuapp.com/signin",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
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
};
