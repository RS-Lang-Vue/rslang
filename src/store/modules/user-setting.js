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
        currentWords: [0, 0, 0, 0, 0, 0],
        group: 0,
        useUserWords: false,
        minUserWordCount: 20,
      },
      gamePuzzle: {
        currentWords: [0, 0, 0, 0, 0, 0],
        group: 0,
        useUserWords: false,
        minUserWordCount: 20,
      },
      gameSavannah: {
        currentWords: [0, 0, 0, 0, 0, 0],
        group: 0,
        useUserWords: false,
        minUserWordCount: 20,
      },
      gameAuidioCall: {
        currentWords: [0, 0, 0, 0, 0, 0],
        group: 0,
        useUserWords: false,
        minUserWordCount: 20,
      },
      gameSprint: {
        currentWords: [0, 0, 0, 0, 0, 0],
        group: 0,
        useUserWords: false,
        minUserWordCount: 20,
      },
      gameOwnGame: {
        currentWords: [0, 0, 0, 0, 0, 0],
        group: 0,
        useUserWords: false,
        minUserWordCount: 20,
      },
    },
  },
  actions: {
    uploadSettings() {
      const { user } = this.state;
      const { wordsPerDay, optional } = this.state.userSetting;
      console.log({ wordsPerDay, optional });
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
            ["currentWords", "group", "useUserWords", "minUserWordCount"].forEach((setting) => {
              if (userSettings[game][setting] !== undefined)
                state.userSettings[game][setting] = userSettings[game][setting];
            });
          }
        });
      }
    },
  },
  getters: {},
};
