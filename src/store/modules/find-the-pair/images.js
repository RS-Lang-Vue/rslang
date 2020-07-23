const API_KEY_UNSPLASH = `dMIrbpYqTFP0ZLZ7KCKSSkzawKHaKg6QI8KeVHz9-xc`;
const BASE_URL_UNSPLASH = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&client_id=${API_KEY_UNSPLASH}`;

export default {
  state: {
    imageUnsplash: "",
  },
  mutations: {
    updateImagesUnsplash(state, image) {
      state.imageUnsplash = image;
    },
  },
  actions: {
    async fetchImagesUnsplash({ commit, dispatch }) {
      try {
        const res = await fetch(BASE_URL_UNSPLASH);
        if (!res.ok) {
          const limit = await res.text();
          if (limit === "Rate Limit Exceeded") {
            throw new Error(
              `Этот раунд без картинки. Ограничение API Unsplash 50 изображений в час. Извините.`
            );
          }
          const data = await res.json();
          const message = data.errors ? `Сообщение: ${data.errors[0]}` : "";
          throw new Error(`${message} Статус ответа сервера: ${res.status}.`);
        }
        const data = await res.json();
        const image = data.urls.regular;
        commit("updateImagesUnsplash", image);
      } catch (err) {
        dispatch("setError", err.message);
        throw err;
      }
    },
  },
  getters: {
    getImagesUnsplash(state) {
      return state.imageUnsplash;
    },
  },
  modules: {},
};
