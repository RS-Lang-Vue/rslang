import axios from "axios";
import config from "@/config/config";

export default {
  state: {
    words: null,
    isGameStarted: false,
    audioCallGoneLevel: 0, // from 0 to 5
    audioCallWordPage: 0, // from 0 to 29
    audioCallCurrentLevel: 0, // from 0 to 5
    isAudioCallPageLoading: false,
  },
  mutations: {
    SET_WORDS(state, payload) {
      state.words = payload;
    },
    SET_IS_AUDIO_CALL_STARTED(state, payload) {
      state.isGameStarted = payload;
    },
    SET_AUDIO_CALL_LEVEL(state, payload) {
      state.audioCallGoneLevel = payload;
    },
    SET_AUDIO_CALL_WORD_PAGE(state, payload) {
      state.audioCallWordPage = payload;
    },
    SET_AUDIO_CALL_CURRENT_LEVEL(state, payload) {
      state.audioCallCurrentLevel = payload;
    },
    SET_IS_AUDIO_CALL_PAGE_LOADING(state, payload) {
      state.isAudioCallPageLoading = payload;
    },
  },
  actions: {
    async fetchWords(store, payload = { group: 0, page: 0 }) {
      const { group, page } = payload;
      const res = await axios.get(`${config.apiBaseUrl}words?group=${group}&page=${page}`);
      store.commit("SET_WORDS", res.data);
    },
  },
  getters: {
    GET_WORDS: (state) =>
      state.words.map((el) => ({
        ...el,
        image: config.dataBaseUrl + el.image,
        audio: config.dataBaseUrl + el.audio,
        audioMeaning: config.dataBaseUrl + el.audioMeaning,
        audioExample: config.dataBaseUrl + el.audioExample,
      })),
    GET_IS_AUDIO_CALL_STARTED: (state) => state.isGameStarted,
    GET_AUDIO_CALL_GONE_LEVEL: (state) => state.audioCallGoneLevel,
    GET_AUDIO_CALL_WORD_PAGE: (state) => state.audioCallWordPage,
    GET_AUDIO_CALL_CURRENT_LEVEL: (state) => state.audioCallCurrentLevel,
    GET_IS_AUDIO_CALL_PAGE_LOADING: (state) => state.isAudioCallPageLoading,
  },
};
