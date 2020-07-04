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
            <div class="d-flex flex-no-wrap justify-space-between align-center">
              <v-btn icon class="ma-2">
                <v-icon @click="audio.play(wordObject.audio)">mdi-volume-high</v-icon>
              </v-btn>
              <v-card-text>
                <span class="text-sm-h4 text-h5">
                  {{ wordObject.word }}
                </span>
                <p v-if="learnSettingsToggles.transcription.state" class="text-body-1">
                  {{ wordObject.transcription }}
                </p>
                <div v-if="isWordTranslate" class="text-subtitle-1">
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
                <span v-html="wordObject.textMeaning"></span>
              </p>
              <p v-if="isWordTranslate" class="text-body-2 mb-0">
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
              <p class="text-body-1 mb-2"><span v-html="wordObject.textExample"></span></p>
              <p v-if="isWordTranslate" class="text-body-2 mb-0">
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
        <v-btn text color="indigo accent-4">
          Далее
        </v-btn>
      </v-card-actions>

      <!-- <v-divider></v-divider> -->

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
  </div>
</template>

<script>
// import { mapState } from "vuex";
import AudioControl from "@/helpers/english-puzzle/audio-control";
import config from "@/config/config";
import wordsArray from "./learnObjects/wordsArray";
// import learnSettingsObject from "./learnObjects/learnSettingsObject";

export default {
  data: () => ({
    wordsArray,
    step: 0,
    audio: {},
    prefixImagePath: config.audioBaseUrl,
  }),
  computed: {
    learnSettingsToggles() {
      return this.$store.state.userSettings.optional.learn.toggles;
    },
    isWordTranslate() {
      return this.$store.state.userSettings.optional.learn.toggles.wordTranslate.state;
    },
  },
  mounted() {
    this.audio = new AudioControl();
    this.autoAudioPlay();
  },
  watch: {
    step: function steps() {
      this.autoAudioPlay();
    },
  },
  methods: {
    autoAudioPlay() {
      if (this.learnSettingsToggles.autoPronunciation.state) {
        this.audio.play(wordsArray[this.step].audio);
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

.icon-block {
  display: block;
}
</style>
