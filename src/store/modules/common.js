export default {
  state: {
    loading: false,
    error: null,
  },
  mutations: {
    updateLoading(state, payload) {
      state.loading = payload;
    },
    updateError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit("updateLoading", payload);
    },
    setError({ commit }, payload) {
      commit("updateError", payload);
    },
    clearError({ commit }) {
      commit("clearError");
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
};
