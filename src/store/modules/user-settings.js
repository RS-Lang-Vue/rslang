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
        round: [0, 0, 0, 0, 0, 0],
        level: 0,
      },
      gamePuzzle: {
        round: [0, 0, 0, 0, 0, 0],
        level: 0,
        roundsInLevelCount: 0,
        levelCount: 5,
        hints: {
          translation: true,
          showBackground: true,
          speak: true,
          speakAuto: true,
        },
      },
      gameSavannah: {
        round: [0, 0, 0, 0, 0, 0],
        level: 0,
      },
      gameAuidioCall: {
        round: [0, 0, 0, 0, 0, 0],
        level: 0,
      },
      gameSprint: {
        round: [0, 0, 0, 0, 0, 0],
        level: 0,
      },
      gameOwnGame: {
        round: [0, 0, 0, 0, 0, 0],
        level: 0,
      },
    },
  },
  actions: {
    async uploadSettings() {
      const user = await this.dispatch("getUser");
      const { wordsPerDay, optional } = this.state.userSettings;
      fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/settings`, {
        method: "PUT",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wordsPerDay, optional }),
      });
    },
    async downloadSettings({ commit }) {
      const user = await this.dispatch("getUser");
      const res = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${user.userId}/settings`,
        {
          method: "GET",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );
      if (res.ok) {
        const userSettings = await res.json();
        if (
          userSettings.optional !== undefined &&
          Object.keys(userSettings.optional).length !== 0
        ) {
          commit("setUserSettings", userSettings);
        } else {
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
