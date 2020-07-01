export default {
  state: {
    wordsPerDay: 20,
    optional: {
      globalSettings: {
        maxCards: 50,
        answerBtn: false,
        deleteBtn: false,
        btnDifficult: false,
        btnSet: false,
      },
      wordsTraining: {
        wordTranslate: false,
        textMeaning: false,
        textExample: false,
        transcription: false,
        image: false,
      },
      gameSpeakIt: {
        nextRound: [0, 0, 0, 0, 0, 0],
        group: 0,
      },
      gamePuzzle: {
        nextRound: [0, 0, 0, 0, 0, 0],
        group: 0,
      },
      gameSavannah: {
        nextRound: [0, 0, 0, 0, 0, 0],
        group: 0,
      },
      gameAuidioCall: {
        nextRound: [0, 0, 0, 0, 0, 0],
        group: 0,
      },
      gameSprint: {
        nextRound: [0, 0, 0, 0, 0, 0],
        group: 0,
      },
      gameOwnGame: {
        nextRound: [0, 0, 0, 0, 0, 0],
        group: 0,
      },
    },
  },
  actions: {
    uploadSettings() {
      const { user } = this.state;
      const { wordsPerDay, optional } = this.state.userSettings;
      fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user.user.userId}/settings`, {
        method: "PUT",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.user.token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({ wordsPerDay, optional }),
      });
    },
    async downloadSettings({ commit }) {
      const { user } = this.state;
      const res = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${user.user.userId}/settings`,
        {
          method: "GET",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.user.token}`,
            Accept: "application/json",
          },
        }
      );
      if (res.ok) {
        const userSettings = await res.json();
        if (userSettings.optional !== undefined && userSettings.optional !== {}) {
          commit("setUserSettings", userSettings);
        } else if (userSettings.optional === {}) {
          this.dispatch("uploadSettings");
        }
      }
    },
    setGameSetting({ commit }, { gameName, gameSettings }) {
      commit("setGameSetting", { gameName, gameSettings });
      this.dispatch("uploadSettings");
    },
  },
  mutations: {
    setUserSettings(state, userSettings) {
      this.state.userSettings = userSettings;
    },
    setGameSetting(state, { gameName, gameSettings }) {
      state.optional[gameName] = gameSettings;
    },
  },
  getters: {},
};
