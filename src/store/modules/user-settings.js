import settingsConstants from "@/config/settingsConstants";

export default {
  state: {
    // wordsPerDay: 20,
    optional: {
      learn: {
        wordsPerDay: settingsConstants.DEFAULT_WORDS_PER_DAY,
        newWordsPerDay: settingsConstants.DEFAULT_NEW_WORDS_PER_DAY,
        toggles: {
          wordTranslate: {
            title: "Перевод",
            state: true,
          },
          textMeaning: {
            title: "Объяснение значения",
            state: true,
          },
          textExample: {
            title: "Пример использования",
            state: true,
          },
          transcription: {
            title: "Транскрипция",
            state: true,
          },
          image: {
            title: "Картинка-ассоциация",
            state: true,
          },
          autoPronunciation: {
            title: "Автоматическое произношение",
            state: true,
          },
          translationAfter: {
            title: "Перевод после ответа ",
            state: true,
          },
          answerButton: {
            title: 'Кнопка "Ответ"',
            state: true,
          },
          deleteButton: {
            title: 'Кнопка "Удалить"',
            state: true,
          },
          difficultButton: {
            title: 'Кнопка "Сложное"',
            state: true,
          },
        },
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
    uploadSettings() {
      const { user } = this.state;
      const { wordsPerDay, optional } = this.state.userSettings;
      fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user.user.userId}/settings`, {
        method: "PUT",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.user.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
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
