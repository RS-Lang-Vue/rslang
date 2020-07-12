<template>
  <div v-if="isVisibleContent">
    <v-card class="mx-auto text-start mt-1" max-width="700">
      <v-card-title :class="[isCardStudied ? 'grey' : 'cyan darken-1']">
        <div class="dots">
          <span v-for="n in 5" :key="n" class="dot"></span>
        </div>
        <span class="white--text body-1">новое слово</span>
        <v-spacer></v-spacer>
        <div v-if="isCardStudied">
          <span class="teal--text text--accent-1 body-1 mr-3">карточка изучена</span>
        </div>
        <!-- <v-spacer></v-spacer> -->
        <v-btn
          v-if="learnSettingsToggles.deleteButton.state"
          dark
          icon
          title="Удалить слово из изучаемых"
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
        <v-btn text @click.stop="checkWord" color="indigo accent-4">
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

    <v-bottom-sheet v-model="isShowEvaluation">
      <v-sheet class="text-center" height="300px">
        <v-btn class="mt-4" text color="red" @click="isShowEvaluation = !isShowEvaluation"
          >close</v-btn
        >
        <div class="py-3">
          <p class="text-h5 text-center mt-6">Оцените сложность слова</p>
          <div class="d-flex justify-center flex-wrap text-center">
            <div class="d-flex flex-column">
              <v-btn @click.stop="setEvaluation" class="ma-1" text color="teal accent-4">
                <v-icon large color="teal darken-4">mdi-repeat</v-icon>
                Снова
              </v-btn>
            </div>
            <div class="d-flex flex-column">
              <v-btn @click.stop="setEvaluation" class="ma-1" text color="deep-purple accent-4">
                <v-icon large color="deep-purple darken-4">mdi-emoticon-neutral-outline</v-icon>
                Трудно
              </v-btn>
            </div>
            <div class="d-flex flex-column">
              <v-btn @click.stop="setEvaluation" class="ma-1" text color="green accent-4">
                <v-icon large color="green darken-4">mdi-emoticon-happy-outline</v-icon>
                Хорошо
              </v-btn>
            </div>
            <div class="d-flex flex-column">
              <v-btn @click.stop="setEvaluation" class="ma-1" text color="light-blue accent-4">
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
            <p>Все запланированные новые слова изучены</p>
            <p>Пройдено карточек - {{ getCountLearnedNewCard }}</p>
          </div>
          <div v-else-if="getLearnTypeIsRepeat" class="final-message final-message__new">
            <p>Повтор слов выполнен</p>
            <p>Пройдено карточек - {{ getCountLearnedRepeatCard }}</p>
          </div>
          <div v-else class="final-message final-message__all">
            <p>На сегодня все.</p>
            <p>
              Задача выполнена. Изучено
              {{ getCountLearnedNewCard + getCountLearnedRepeatCard }} карточек. Можно поиграть в
              игры.
            </p>
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
import AudioControl from "@/helpers/audio-control";

export default {
  data: () => ({
    isVisibleContent: false,
    wordsArray: {},
    step: 0,
    audio: {},
    currentWordHtml: "",
    intut: "",
    isRightWord: false,
    isErrorWord: false,
    isIntutOpacity: false,
    isShowEvaluation: false,
    isShowEndLearnInfo: false,
    prefixImagePath: config.dataBaseUrl,
    nameRules: [(v) => !!v || "Введите слово"],
  }),

  computed: {
    ...mapGetters([
      "getCurrentCardStudied",
      "getCurrentLearnStateObject",
      "getLearnType",
      "getCurrentArray",
      "getLearnSettings",
      "getLearnTypeIsNew",
      "getLearnTypeIsRepeat",
      "getCountLearnedNewCard",
      "getCountLearnedRepeatCard",
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
        const isStudied = !!this.currentWordObject.isCardStudied;
        return isStudied;
      },
      set(value) {
        this.$set(this.currentWordObject, "isCardStudied", value);
      },
    },
    currentWord() {
      return this.currentWordObject.word;
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
      console.log(error);
      this.$router.push("/home");
    } finally {
      this.setLoading(false);
    }
  },

  methods: {
    ...mapActions(["setLoading", "getLearnArraysFromServer", "updateMixWordsArrayObjectByStep"]),

    async prepareStart() {
      console.log("isArraysLoaded: ", this.getCurrentLearnStateObject.isArraysLoaded);

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
      setTimeout(() => {
        this.isIntutOpacity = false;
      }, 5000);
    },

    handleErrorWord(inputWord) {
      this.playAllAudio();
      this.isErrorWord = true;
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
      return countError;
    },

    setEvaluation() {
      // todo set raiting word
      this.nextStep();
    },

    handleRightWord() {
      this.playAllAudio();
      this.isCardStudied = true;
      this.displayWordRightInInput();
      setTimeout(() => {
        this.isShowEvaluation = true;
      }, 2000);
      // todo set raiting word
    },

    checkWord() {
      const isNotEmpty = !!this.inputValue;
      if (isNotEmpty) {
        const inputWord = this.inputValue.trim();
        if (inputWord === this.currentWord) {
          if (!this.isCardStudied) this.handleRightWord();
          else this.nextStep();
        } else {
          const countError = this.handleErrorWord(inputWord);
          console.log("countError >>> ", countError);
          // todo set focus on input
          // todo set raiting word
        }
      }
    },

    clear() {
      this.inputValue = "";
      this.isRightWord = false;
      this.currentWordHtml = "";
      this.isIntutOpacity = false;
      this.isShowEvaluation = false;
    },

    showEndLearnInfo() {
      // todo show end's learn info modal window
      console.log("runing showEndLearnInfo");
      this.isShowEndLearnInfo = true;
    },

    runEndLearn() {
      console.log("runEndLearn");
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
      if (this.step === this.wordsArray.length - 1) {
        const indexNotStudiedCart = this.getFastIndexOfIsNotLearnedWordObject();
        if (!indexNotStudiedCart) this.runEndLearn();
        else this.step = indexNotStudiedCart;
      } else {
        this.clear();
        this.step += 1;
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
  background-color: rgba(255, 255, 255, 0.5);
  margin-right: 0.3rem;
}

.dot:nth-child(1) {
  background-color: orange;
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
