<template>
  <div v-if="isVisibleContent">
    <v-card class="mx-auto text-start mt-1" max-width="700">
      <v-card-title :class="[isCardStudied ? 'grey' : 'cyan darken-1']">
        <div class="dots">
          <span
            v-for="n in 5"
            :key="n"
            class="dot"
            :class="{ dot_accent: n - 1 <= numberStatusCurrentWord }"
          ></span>
        </div>
        <span class="white--text body-1">{{ statusNameArray[numberStatusCurrentWord] }}</span>
        <v-spacer></v-spacer>
        <div v-if="isCardStudied">
          <span class="teal--text text--accent-1 body-1 mr-3">карточка изучена</span>
        </div>
        <v-btn
          v-if="learnSettingsToggles.deleteButton.state"
          dark
          icon
          title="Удалить слово из изучаемых"
          @click="handleDeleting(WORD_DELETED)"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item v-for="wordObject in wordsArray" :key="wordObject.id">
          <div class="d-flex flex-xs-nowrap flex-wrap justify-space-between align-center">
            <div class="word-container d-flex flex-no-wrap justify-space-between align-center">
              <v-btn icon class="ma-2">
                <v-icon @click="audio.forcePlay(wordObject.audio)">mdi-volume-high</v-icon>
              </v-btn>
              <v-card-text>
                <div class="card-text__word pb-5">
                  <div class="card-text__word-container text-sm-h4 text-h5 mb-3">
                    <div class="card-text__word-element" v-html="currentWordHtml"></div>
                    {{ currentWord }}
                    <v-text-field
                      v-model.lazy="inputValue"
                      @keyup.enter="checkWord"
                      @input="setInputFieldOpacity"
                      :class="{ 'word-right': isRightWord, opacity: isIntutOpacity }"
                      class="text-field card-text__word-element text-sm-h4 text-h5 ma-0 pa-0"
                      background-color="teal lighten-5"
                      :height="40"
                      :size="wordObject.word.length"
                      :rules="nameRules"
                      required
                      autofocus
                      autocomplete="off"
                      :disabled="isCardStudied"
                    ></v-text-field>
                  </div>
                </div>

                <p v-if="learnSettingsToggles.transcription.state" class="text-body-1">
                  {{ wordObject.transcription }}
                </p>
                <div v-if="isTranslateNow" class="text-subtitle-1">
                  {{ wordObject.wordTranslate }}
                </div>
              </v-card-text>
            </div>
            <v-avatar v-if="learnSettingsToggles.image.state" class="ma-3" size="125" tile>
              <v-img :src="`${prefixImagePath}${wordObject.image}`"></v-img>
            </v-avatar>
          </div>

          <div
            v-if="learnSettingsToggles.textMeaning.state"
            class="d-flex flex-no-wrap justify-space-between align-center"
          >
            <v-btn icon class="ma-2">
              <v-icon @click="audio.forcePlay(wordObject.audioMeaning)">mdi-volume-high</v-icon>
            </v-btn>
            <v-card-text class="text-body-1">
              <p class="text-body-1 mb-2">
                <span v-html="textMeaning"></span>
              </p>
              <p v-if="isTranslateNow" class="text-body-2 mb-0">
                {{ wordObject.textMeaningTranslate }}
              </p>
            </v-card-text>
          </div>

          <div
            v-if="learnSettingsToggles.textExample.state"
            class="d-flex flex-no-wrap justify-space-between align-center"
          >
            <v-btn icon class="ma-2">
              <v-icon @click="audio.forcePlay(wordObject.audioExample)">mdi-volume-high</v-icon>
            </v-btn>
            <v-card-text class="text-body-1">
              <p class="text-body-1 mb-2"><span v-html="textExample"></span></p>
              <p v-if="isTranslateNow" class="text-body-2 mb-0">
                {{ wordObject.textExampleTranslate }}
              </p>
            </v-card-text>
          </div>
        </v-window-item>
      </v-window>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn
          v-if="learnSettingsToggles.answerButton.state"
          @click="handleDeleting(WORD_DIFFICULT)"
          text
          color="indigo accent-4"
          title="Добавить в раздел сложные слова"
        >
          сложное
        </v-btn>
        <v-btn
          v-if="learnSettingsToggles.difficultButton.state"
          @click="showAnswer"
          text
          color="indigo accent-4"
          title="Показать правильный ответ"
          :disabled="isCardStudied"
        >
          ответ
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click.stop="checkWord" :disabled="isCheck" color="indigo accent-4">
          Далее
        </v-btn>
      </v-card-actions>

      <v-card-actions class="pb-0">
        <v-spacer></v-spacer>
        <v-btn color="blue darken-2" icon :disabled="step === 0" @click="step--">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <div class="counter ml-4 mr-4">{{ step + 1 }} / {{ wordsArray.length }}</div>
        <v-btn
          color="blue darken-2"
          icon
          :disabled="step === wordsArray.length - 1"
          depressed
          @click="step++"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>

      <v-progress-linear
        class="mt-1"
        :height="8"
        :value="(100 / wordsArray.length) * (step + 1)"
      ></v-progress-linear>
    </v-card>

    <v-bottom-sheet v-model="isShowEvaluation" persistent>
      <v-sheet class="text-center" height="300px">
        <div class="py-3">
          <p class="text-h5 text-center mt-6">Оцените сложность слова</p>
          <div class="d-flex justify-center flex-wrap text-center">
            <div class="d-flex flex-column">
              <v-btn
                @click.stop="setEvaluation(EVALUATION_AGAIN)"
                class="ma-1"
                text
                color="teal accent-4"
              >
                <v-icon large color="teal darken-4">mdi-repeat</v-icon>
                Снова
              </v-btn>
            </div>
            <div class="d-flex flex-column">
              <v-btn
                @click.stop="setEvaluation(EVALUATION_HARD)"
                class="ma-1"
                text
                color="deep-purple accent-4"
              >
                <v-icon large color="deep-purple darken-4">mdi-emoticon-neutral-outline</v-icon>
                Трудно
              </v-btn>
            </div>
            <div class="d-flex flex-column">
              <v-btn
                @click.stop="setEvaluation(EVALUATION_GOOD)"
                class="ma-1"
                text
                color="green accent-4"
              >
                <v-icon large color="green darken-4">mdi-emoticon-happy-outline</v-icon>
                Хорошо
              </v-btn>
            </div>
            <div class="d-flex flex-column">
              <v-btn
                @click.stop="setEvaluation(EVALUATION_EASY)"
                class="ma-1"
                text
                color="light-blue accent-4"
              >
                <v-icon large color="light-blue darken-4">mdi-emoticon-wink-outline</v-icon>
                Легко
              </v-btn>
            </div>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <v-dialog v-model="isShowEndLearnInfo" width="500">
      <v-card>
        <v-card-title class="headline green lighten-3" primary-title>
          Вы достигли цели
        </v-card-title>

        <v-card-text class="mt-5">
          <div v-if="getLearnTypeIsNew" class="final-message final-message__new">
            <h5>Все запланированные новые слова изучены</h5>
            <p>Пройдено карточек - {{ getCountLearnedNewCard }}</p>
          </div>
          <div v-else-if="getLearnTypeIsRepeat" class="final-message final-message__new">
            <h5>Повтор слов выполнен</h5>
            <p>Пройдено карточек - {{ getCountLearnedRepeatCard }}</p>
          </div>
          <div v-else class="final-message final-message__all">
            <!-- // todo показывать только по изучению всех слов -->
            <p class="text-h6">Задача выполнена. На сегодня все.</p>
            <v-list subheader>
              <v-list-item
                >Пройдено карточек -
                {{ getCountLearnedNewCard + getCountLearnedRepeatCard }}</v-list-item
              >
              <v-list-item
                >Процент правильных ответов - {{ percentageOfCrrectAnswers }}%</v-list-item
              >
              <v-list-item>Изученно новых слов - {{ getCountLearnedNewCard }}</v-list-item>
              <v-list-item
                >Самая длинная серия правильных ответов -
                {{ getCurrentLearnStateObject.bestCorrectAnswersSeries }}</v-list-item
              >
            </v-list>
            <p>Можно поиграть в игры.</p>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="exitLearn">
            ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import config from "@/config/config";
import {
  EVALUATION_AGAIN,
  EVALUATION_HARD,
  EVALUATION_GOOD,
  EVALUATION_EASY,
  statusNameArray,
  WORD_DIFFICULT,
  WORD_DELETED,
  WORD_ORDINARY,
} from "@/config/constants";
import AudioControl from "@/helpers/audio-control";

export default {
  data: () => ({
    EVALUATION_AGAIN,
    EVALUATION_HARD,
    EVALUATION_GOOD,
    EVALUATION_EASY,
    statusNameArray,
    WORD_DIFFICULT,
    WORD_DELETED,
    WORD_ORDINARY,
    isVisibleContent: false,
    wordsArray: {},
    step: 0,
    audio: {},
    currentWordHtml: "",
    currentAttemptCount: 0,
    intut: "",
    isRightWord: false,
    isIntutOpacity: false,
    isShowEvaluation: false,
    isShowEndLearnInfo: false,
    isCheck: false,
    prefixImagePath: config.dataBaseUrl,
    nameRules: [(v) => !!v || "Введите слово"],
  }),

  computed: {
    ...mapGetters([
      "getCurrentLearnStateObject",
      "getLearnType",
      "getCurrentArray",
      "getLearnSettings",
      "getLearnTypeIsNew",
      "getLearnTypeIsRepeat",
      "getCountLearnedNewCard",
      "getCountLearnedRepeatCard",
      "getCountAttemptsAllCards",
    ]),
    inputValue: {
      get() {
        return this.isCardStudied ? this.currentWord : this.intut;
      },
      set(value) {
        this.intut = value;
      },
    },

    currentWordObject() {
      return this.getCurrentArray[this.step];
    },

    isCardStudied: {
      get() {
        return !!this.currentWordObject.isCardStudied;
      },
      set(value) {
        this.$set(this.currentWordObject, "isCardStudied", value);
      },
    },

    hasWordCorrectAnswer: {
      get() {
        return !!this.currentWordObject.hasWordCorrectAnswer;
      },
      set(value) {
        this.$set(this.currentWordObject, "hasWordCorrectAnswer", value);
      },
    },

    attemptСount: {
      get() {
        if (typeof this.currentWordObject.attemptСount !== "undefined")
          return this.currentWordObject.attemptСount;
        return 0;
      },
      set(value) {
        this.$set(this.currentWordObject, "attemptСount", value);
      },
    },

    percentageOfCrrectAnswers() {
      return Math.round(
        ((this.getCountLearnedNewCard + this.getCountLearnedRepeatCard) /
          this.getCountAttemptsAllCards) *
          100
      );
    },

    wasHint: {
      get() {
        return !!this.currentWordObject.wasHint;
      },
      set(value) {
        this.$set(this.currentWordObject, "wasHint", value);
      },
    },

    currentWord() {
      return this.currentWordObject.word;
    },

    numberStatusCurrentWord() {
      if (!this.currentWordObject.userWord) return 0;
      // check for old notes
      if (!this.currentWordObject.userWord.optional.status) return 1;
      return this.currentWordObject.userWord.optional.status;
    },

    learnSettingsToggles() {
      return this.$store.state.userSettings.optional.learn.toggles;
    },
    isTranslateState() {
      return this.$store.state.userSettings.optional.learn.toggles.wordTranslate.state;
    },
    isTranslateNow() {
      return this.isCardStudied && this.isTranslateState;
    },
    textMeaning() {
      let text = this.currentWordObject.textMeaning;
      const regex = /<i>\w+<\/i>/;
      if (!this.isCardStudied) {
        text = text.replace(regex, " ... ");
      }
      return text;
    },
    textExample() {
      let text = this.currentWordObject.textExample;
      const regex = /<b>\w+<\/b>/;
      if (!this.isCardStudied) {
        text = text.replace(regex, " ... ");
      }
      return text;
    },
  },
  watch: {
    step: function steps() {
      this.autoAudioPlayWord();
      this.clear();
    },
  },

  async mounted() {
    this.setLoading(true);
    try {
      await this.prepareStart();
      const fastStep = this.getFastIndexOfIsNotLearnedWordObject();
      if (fastStep) this.step = fastStep;
      this.isVisibleContent = true;
      this.autoAudioPlayWord();
    } catch (error) {
      this.$router.push("/home");
    } finally {
      this.setLoading(false);
    }
  },

  methods: {
    ...mapActions([
      "setLoading",
      "getLearnArraysFromServer",
      "addAnswerResult",
      "setError",
      "setUserWordWithCheck",
      "getUserAggregateWords",
    ]),

    async prepareStart() {
      if (!this.getCurrentLearnStateObject.isArraysLoaded) {
        await this.getLearnArraysFromServer();
      }
      this.wordsArray = this.getCurrentArray;
      this.audio = new AudioControl();
    },

    autoAudioPlayWord() {
      if (this.learnSettingsToggles.autoPronunciation.state) {
        this.audio.forcePlay(this.currentWordObject.audio);
      }
    },
    playAllAudio() {
      if (this.learnSettingsToggles.autoPronunciation.state) {
        setTimeout(() => this.audio.forcePlay(this.currentWordObject.audio), 100);

        if (this.learnSettingsToggles.textMeaning.state) {
          setTimeout(() => this.audio.play(this.currentWordObject.audioMeaning), 500);
        }
        if (this.learnSettingsToggles.textExample.state) {
          setTimeout(() => this.audio.play(this.currentWordObject.audioExample), 2000);
        }
      }
    },

    setInputFieldOpacity() {
      if (this.inputValue) {
        this.isIntutOpacity = false;
      }
    },

    displayWordRightInInput() {
      this.inputValue = this.currentWord;
      this.playAllAudio();
      this.isRightWord = true;
    },

    showAnswer() {
      this.currentWordHtml = this.currentWord;
      this.inputValue = "";
      this.isIntutOpacity = true;
      this.wasHint = true;
      this.getCurrentLearnStateObject.currentCorrectAnswersSeries = 0;
      setTimeout(() => {
        this.isIntutOpacity = false;
      }, 5000);
    },

    handleErrorWord(inputWord) {
      this.playAllAudio();
      this.hasWordCorrectAnswer = false;
      this.getCurrentLearnStateObject.currentCorrectAnswersSeries = 0;
      const charsArrayCurrentWord = this.currentWord.split("");
      const charsArrayInputWord = inputWord.split("");
      let countError = 0;
      const checkArray = charsArrayCurrentWord.map((char, index) => {
        if (charsArrayInputWord[index] && charsArrayInputWord[index] === char) return true;
        countError += 1;
        return false;
      });

      let errorCharColor = "red";
      const rightCharColor = "green";
      if (countError < 3) errorCharColor = "orange";

      const tagArray = charsArrayCurrentWord.reduce((newArray, char, index) => {
        let colorChar = errorCharColor;
        if (checkArray[index]) colorChar = rightCharColor;
        const tagSpanString = `<span style="color:${colorChar}">${char}</span>`;
        newArray.push(tagSpanString);
        return newArray;
      }, []);

      this.currentWordHtml = tagArray.join("");
      this.inputValue = "";
      this.isIntutOpacity = true;
      this.isCheck = false;
      return countError;
    },

    setEvaluation(message) {
      if (message === EVALUATION_AGAIN) {
        this.isCardStudied = false;
      } else {
        const resultOptionObject = {
          wordId: this.currentWordObject._id,
          isCorrectAnswer: this.hasWordCorrectAnswer,
          userEvaluation: EVALUATION_HARD,
          attemptСount: this.attemptСount,
        };
        if (message === EVALUATION_GOOD) resultOptionObject.userEvaluation = EVALUATION_GOOD;
        if (message === EVALUATION_EASY) resultOptionObject.userEvaluation = EVALUATION_EASY;
        this.addAnswerResult(resultOptionObject);
      }
      this.nextStep();
    },

    addToCorrectAnswersSeries() {
      const state = this.getCurrentLearnStateObject;
      state.currentCorrectAnswersSeries += 1;
      if (state.currentCorrectAnswersSeries > state.bestCorrectAnswersSeries)
        state.bestCorrectAnswersSeries = state.currentCorrectAnswersSeries;
    },

    handleRightWord() {
      this.playAllAudio();
      this.isCardStudied = true;
      this.displayWordRightInInput();
      if (this.attemptСount === 1 && !this.wasHint) {
        this.hasWordCorrectAnswer = true;
        this.addToCorrectAnswersSeries();
      }
      if (this.learnSettingsToggles.userEvaluation.state) {
        setTimeout(() => {
          this.isShowEvaluation = true;
        }, 1000);
      } else {
        const resultOptionObject = {
          wordId: this.currentWordObject._id,
          isCorrectAnswer: this.hasWordCorrectAnswer,
          attemptСount: this.attemptСount,
        };
        this.addAnswerResult(resultOptionObject);
        setTimeout(() => {
          this.nextStep();
        }, 10000);
      }
    },

    checkWord() {
      if (this.isCardStudied) this.nextStep();
      else {
        const isNotEmpty = !!this.inputValue;
        if (isNotEmpty) {
          this.isCheck = true;
          this.attemptСount += 1;
          const inputWord = this.inputValue.trim();
          if (inputWord.toLowerCase() === this.currentWord.toLowerCase()) {
            this.handleRightWord();
          } else {
            this.handleErrorWord(inputWord);
          }
        }
      }
    },

    clear() {
      this.inputValue = "";
      this.isRightWord = false;
      this.currentWordHtml = "";
      this.currentAttemptCount = 0;
      this.isIntutOpacity = false;
      this.isShowEvaluation = false;
      this.audio.stop();
    },

    showEndLearnInfo() {
      this.isShowEndLearnInfo = true;
    },

    runEndLearn() {
      this.isShowEvaluation = false;
      // todo save statistic & etc.
      // todo update statictics and goals
      this.showEndLearnInfo();
    },

    exitLearn() {
      this.isShowEndLearnInfo = false;
      this.clear();
      this.$router.push("/home");
    },

    getFastIndexOfIsNotLearnedWordObject() {
      const indexNotStudiedCart = this.wordsArray.findIndex(
        (wordsObject) => !wordsObject.isCardStudied
      );
      if (indexNotStudiedCart === -1) return false;
      return indexNotStudiedCart;
    },

    nextStep() {
      this.isCheck = false;
      if (this.step === this.wordsArray.length - 1) {
        const indexNotStudiedCart = this.getFastIndexOfIsNotLearnedWordObject();
        if (!indexNotStudiedCart) this.runEndLearn();
        else this.step = indexNotStudiedCart;
      } else {
        this.clear();
        this.step += 1;
      }
    },

    showAlert(type, title, text) {
      this.$notify({
        group: "main",
        type,
        title,
        text,
      });
    },

    async getOneWordFromServer(isNew) {
      const numberOfWordsRequested = this.getCurrentArray.length + 1;
      const optionObject = {
        page: 0,
        wordsPerPage: numberOfWordsRequested,
        onlyNotLearned: isNew,
        onlyLearned: !isNew,
      };
      if (!isNew) optionObject.difficulty = WORD_ORDINARY;
      const resWord = await this.getUserAggregateWords(optionObject);
      if (resWord.success) return resWord.result;
      return false;
    },

    async handleDeleting(message) {
      console.log("handleDeleting message > ", message);
      this.setLoading(true);
      const isNewWord = !this.currentWordObject.userWord;
      try {
        if (isNewWord) this.currentWordObject.userWord = { difficulty: message };
        else this.currentWordObject.userWord.difficulty = message;
        console.log("this.currentWordObject", this.currentWordObject.word);

        const res = await this.setUserWordWithCheck({
          userWord: this.currentWordObject.userWord,
          wordId: this.currentWordObject._id,
        });
        console.log("setUserWordWithCheck res >>>", res);

        const newWordsArray = await this.getOneWordFromServer(isNewWord);
        console.log("getOneWordFromServer newWordsArray >>>", newWordsArray);

        console.log("getOneWordFromServer !!newWordObject >>>", !!newWordsArray);
        console.log("res.succes >>>", res.success);
        if (res.success && !!newWordsArray) {
          const newWordObject = newWordsArray.find(
            (element) => element._id !== this.currentWordObject._id
          );
          if (!newWordObject) throw new Error("no matching word found");

          this.getCurrentArray.splice(this.step, 1);
          this.getCurrentArray.push(newWordObject);
          this.showAlert("success", "Успешно", "Карточка удалена из изучения");
          // todo
          this.autoAudioPlayWord();
        }
      } catch (error) {
        this.setError("Oшибка удаления карточки");
        console.log("ошибка удаления карточки", error);
      } finally {
        this.setLoading(false);
      }
    },
  },
};
</script>

<style scope>
.dots {
  margin-right: 0.5rem;
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.37);
  margin-right: 0.3rem;
}

.dot_accent {
  background-color: white;
}

.card-text__word-element {
  position: absolute;
  top: 0;
}
.card-text__word-container {
  position: relative;
  height: 40px;
  color: rgba(0, 0, 0, 0.2);
  user-select: none;
}

.theme--light.v-input.word-right input {
  color: green;
}

v-input.word-right input {
  max-height: 36px;
}

.text-field {
  transition: opacity 1s;
  opacity: 1;
}

.opacity {
  opacity: 0.35;
}
</style>
