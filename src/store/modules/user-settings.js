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
        commit("setUserSettings", userSettings);
      } else if (res.status === 404) {
        this.dispatch("uploadSettings");
      }
    },
    setGameSetting({ commit }, { gameName, gameSettings }) {
      commit("setGameSetting", { gameName, gameSettings });
      this.dispatch("uploadSettings");
    },
  },
  mutations: {
    setUserSettings(state, userSettings) {
      if (userSettings.wordsPerDay !== undefined) {
        state.userSettings.wordsPerDay = userSettings.wordsPerDay;
      }
      if (userSettings.optional !== undefined && userSettings.optional !== {}) {
        if (userSettings.globalSettings !== {}) {
          ["maxCards", "answerBtn", "deleteBtn", "btnDifficult", "btnSet"].forEach((setting) => {
            if (userSettings.globalSettings[setting] !== undefined)
              state.userSettings.globalSettings[setting] = userSettings.globalSettings[setting];
          });
        }
        if (userSettings.wordsTraining !== {}) {
          ["wordTranslate", "textMeaning", "textExample", "transcription", "image"].forEach(
            (setting) => {
              if (userSettings.globalSettings[setting] !== undefined)
                state.userSettings.globalSettings[setting] = userSettings.globalSettings[setting];
            }
          );
        }
        [
          "gameSpeakIt",
          "gamePuzzle",
          "gameSavannah",
          "gameAuidioCall",
          "gameSprint",
          "gameOwnGame",
        ].forEach((game) => {
          if (userSettings[game] !== {}) {
            ["nextRound", "group", "useUserWords"].forEach((setting) => {
              if (userSettings[game][setting] !== undefined)
                state.userSettings[game][setting] = userSettings[game][setting];
            });
          }
        });
      }
    },
    setGameSetting(state, { gameName, gameSettings }) {
      state.optional[gameName] = gameSettings;
    },
  },
  getters: {},
};
