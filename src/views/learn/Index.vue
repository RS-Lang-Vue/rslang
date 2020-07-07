<template>
  <div>
    <v-card class="mx-auto text-start" max-width="700">
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
                <v-icon @click="audio.play(wordObject.audio)">mdi-volume-high</v-icon>
              </v-btn>
              <v-card-text>
                <div class="card-text__word pb-2">
                  <div class="card-text__word-container text-sm-h4 text-h5 mb-3">
                    <div class="card-text__word-element" v-html="currentErrorWordHtml"></div>
                    {{ currentWord }}
                    <v-text-field
                      v-model.lazy="inputValue"
                      @keyup.enter="checkWord"
                      @input="inputField"
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

                <p
                  v-if="learnSettingsToggles.transcription.state && isTranslateNow"
                  class="text-body-1"
                >
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
              <v-icon @click="audio.play(wordObject.audioMeaning)">mdi-volume-high</v-icon>
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
              <v-icon @click="audio.play(wordObject.audioExample)">mdi-volume-high</v-icon>
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

    <v-card class="evaluation-contaner mx-auto text-center" max-width="500">
      <p class="text-h5 text-center mt-8">Оцените сложность слова</p>
      <div class="d-flex justify-center flex-wrap text-center">
        <div class="d-flex flex-column mb-2">
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
    </v-card>
  </div>
</template>

<script>
import AudioPlayer from "@/helpers/learn/AudioPlayer";
// import playAudioSequence from "@/helpers/learn/audioUtils";
import config from "@/config/config";
import wordsArray from "./learnObjects/wordsArray";

export default {
  data: () => ({
    wordsArray,
    step: 0,
    audio: {},
    prefixImagePath: config.audioBaseUrl,
    nameRules: [(v) => !!v || "Введите слово"],
    inputValue: "",
    isCardStudied: false,
    isRightWord: false,
    currentErrorWordHtml: "",
    isErrorWord: false,
    isIntutOpacity: false,
  }),

  computed: {
    currentWord() {
      return wordsArray[this.step].word;
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

  mounted() {
    this.audio = new AudioPlayer();
    this.autoAudioPlayWord();
  },

  watch: {
    step: function steps() {
      this.autoAudioPlayWord();
      this.clear();
    },
  },

  methods: {
    autoAudioPlayWord() {
      if (this.learnSettingsToggles.autoPronunciation.state) {
        this.audio.play(wordsArray[this.step].audio);
      }
    },
    playAllAudio() {
      if (this.learnSettingsToggles.autoPronunciation.state) {
        const srcArray = [wordsArray[this.step].audio];
        if (this.learnSettingsToggles.textMeaning.state) {
          srcArray.push(wordsArray[this.step].audioMeaning);
        }
        if (this.learnSettingsToggles.textExample.state) {
          srcArray.push(wordsArray[this.step].audioExample);
        }
        this.audio.playAudioSequence(srcArray);
        // todo interact play audio Sequence
      }
    },

    displayWordRight() {
      this.isRightWord = true;
    },

    inputField() {
      if (this.inputValue) {
        this.isIntutOpacity = false;
        // this.currentErrorWordHtml = "";
      }
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
      // TODO >>> here !!!
      return countError;
    },
    checkWord() {
      console.log("inputValue >>> ", this.inputValue);
      const isNotEmpty = !!this.inputValue;
      if (isNotEmpty) {
        const inputWord = this.inputValue.trim();
        if (inputWord === this.currentWord) {
          this.audio.play(wordsArray[this.step].audio);
          this.isCardStudied = true;
          this.displayWordRight();
          // todo set raiting word
          setTimeout(this.nextStep, 3000);
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
    },

    nextStep() {
      this.clear();
      if (this.step < wordsArray.length) this.step += 1;
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
