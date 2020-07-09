<template>
  <div v-if="isLoad">
    <v-card class="mx-auto text-start mt-1" max-width="700">
      <v-card-title class="cyan darken-1">
        <div class="dots">
          <span v-for="n in 5" :key="n" class="dot"></span>
        </div>
        <span class="white--text">новое слово</span>

        <v-spacer></v-spacer>

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
                <div class="card-text__word pb-2">
                  <div class="card-text__word-container text-sm-h4 text-h5 mb-3">
                    <div class="card-text__word-element" v-html="currentErrorWordHtml"></div>
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
          title="Показать правильные ответ"
        >
          ответ
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click.stop="checkWord" color="indigo accent-4">
          Далее
        </v-btn>
      </v-card-actions>

      <v-card-actions>
        <v-btn :disabled="step === 0" text @click="step--">
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <div class="counter ml-4 mr-4">{{ step + 1 }} / {{ wordsArray.length }}</div>
        <v-spacer></v-spacer>
        <v-btn :disabled="step === wordsArray.length - 1" color="primary" depressed @click="step++">
          Next
        </v-btn>
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
              <v-icon large color="teal darken-4">mdi-repeat</v-icon>
              <v-btn class="ma-1" text color="teal accent-4">
                Снова
              </v-btn>
            </div>
            <div class="d-flex flex-column">
              <v-icon large color="deep-purple darken-4">mdi-emoticon-neutral-outline</v-icon>
              <v-btn class="ma-1" text color="deep-purple accent-4">
                Трудно
              </v-btn>
            </div>
            <div class="d-flex flex-column">
              <v-icon large color="green darken-4">mdi-emoticon-happy-outline</v-icon>
              <v-btn class="ma-1" text color="green accent-4">
                Хорошо
              </v-btn>
            </div>
            <div class="d-flex flex-column">
              <v-icon large color="light-blue darken-4">mdi-emoticon-wink-outline</v-icon>
              <v-btn class="ma-1" text color="light-blue accent-4">
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
          <p>Дневная норма выполнена.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in
          </p>
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
import AudioControl from "@/helpers/audio-control";
import config from "@/config/config";
// import defaultWordsArray from "@/components/learn/learnObjects/wordsArray";

export default {
  data: () => ({
    isLoad: false,
    wordsArray: this.getMixWordsArray,
    // todo getCurrentArray
    step: 0,
    audio: {},
    prefixImagePath: config.dataBaseUrl,
    nameRules: [(v) => !!v || "Введите слово"],
    inputValue: "",
    isCardStudied: false,
    isRightWord: false,
    currentErrorWordHtml: "",
    isErrorWord: false,
    isIntutOpacity: false,
    isShowEvaluation: false,
    isShowEndLearnInfo: false,
  }),

  computed: {
    ...mapGetters(["getLearnType", "getMixWordsArray", "getLearnSettings"]),
    currentWord() {
      return this.wordsArray[this.step].word;
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
      let text = this.wordsArray[this.step].textMeaning;
      const regex = /<i>\w+<\/i>/;
      if (!this.isCardStudied) {
        text = text.replace(regex, " ... ");
      }
      return text;
    },
    textExample() {
      let text = this.wordsArray[this.step].textExample;
      const regex = /<b>\w+<\/b>/;
      if (!this.isCardStudied) {
        text = text.replace(regex, " ... ");
      }
      return text;
    },
  },

  async mounted() {
    this.setLoading(true);
    console.log("type learn >>>", this.getLearnType);

    const type = this.getLearnType;
    // todo getAllWordsArray()
    // todo getNewWordsArray()
    // todo getRepeatWordsArray()

    let requestObject = {
      group: undefined,
      page: 0,
      wordsPerPage: 20,
      onlyLearned: false,
      onlyNotLearned: true,
    };

    if (type === "repeat") {
      const wordsPerPage = this.getLearnSettings.wordsPerDay - this.getLearnSettings.newWordsPerDay;
      if (!wordsPerPage) throw new Error("Change Settings. Words to repeat = 0");
      requestObject = {
        group: undefined,
        page: 0,
        wordsPerPage,
        onlyLearned: false,
        onlyNotLearned: true,
      };
    }

    try {
      const res = await this.getUserAggregateWords(requestObject);
      console.log("result", res.result);
      this.wordsArray = await res.result;

      this.audio = new AudioControl();
      this.isLoad = true;

      this.autoAudioPlayWord();
    } catch (error) {
      console.log(error);
      this.$router.push("/home");
    } finally {
      this.setLoading(false);
    }
  },

  watch: {
    step: function steps() {
      this.autoAudioPlayWord();
      this.clear();
    },
  },

  methods: {
    ...mapActions(["setLoading", "getUserAggregateWords"]),
    autoAudioPlayWord() {
      if (this.learnSettingsToggles.autoPronunciation.state) {
        this.audio.forcePlay(this.wordsArray[this.step].audio);
      }
    },
    playAllAudio() {
      if (this.learnSettingsToggles.autoPronunciation.state) {
        setTimeout(() => this.audio.forcePlay(this.wordsArray[this.step].audio), 100);

        if (this.learnSettingsToggles.textMeaning.state) {
          setTimeout(() => this.audio.play(this.wordsArray[this.step].audioMeaning), 500);
        }
        if (this.learnSettingsToggles.textExample.state) {
          setTimeout(() => this.audio.play(this.wordsArray[this.step].audioExample), 2000);
        }
      }
    },

    displayWordRight() {
      this.isRightWord = true;
    },

    setInputFieldOpacity() {
      if (this.inputValue) {
        this.isIntutOpacity = false;
      }
    },

    setEvaluation() {
      this.isShowEvaluation = true;
    },

    handleErrorWord(inputWord) {
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

      this.inputValue = "";
      this.currentErrorWordHtml = tagArray.join("");
      this.isIntutOpacity = true;
      return countError;
    },

    handleAnswerWord() {
      this.playAllAudio();
      this.displayWordRight();
    },

    showAnswer() {
      this.inputValue = this.currentWord;
      this.handleAnswerWord();
    },

    handleRightWord() {
      this.isCardStudied = true;
      this.handleAnswerWord();
      this.setEvaluation();
      // todo set raiting word
      setTimeout(this.nextStep, 12000);
    },

    checkWord() {
      console.log("inputValue >>> ", this.inputValue);
      const isNotEmpty = !!this.inputValue;
      if (isNotEmpty) {
        const inputWord = this.inputValue.trim();
        if (inputWord === this.currentWord) {
          this.handleRightWord();
        } else {
          this.playAllAudio();
          const countError = this.handleErrorWord(inputWord);
          console.log("countError >>> ", countError);
          // todo set focus on input
          // todo set raiting word
        }
      }
    },

    clear() {
      this.inputValue = "";
      this.isCardStudied = false;
      this.isRightWord = false;
      this.currentErrorWordHtml = "";
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

    nextStep() {
      console.log(
        "nextStep > this.step:",
        this.step,
        ", this.wordsArray.length:",
        this.wordsArray.length
      );
      if (this.step === this.wordsArray.length - 1) this.runEndLearn();
      else {
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

.text-field {
  transition: opacity 1s;
  opacity: 1;
}

.opacity {
  opacity: 0.35;
}
</style>
