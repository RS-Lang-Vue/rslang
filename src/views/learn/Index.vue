<template>
  <div>
    <v-card class="mx-auto text-start" max-width="700">
      <v-card-title class="cyan darken-1">
        <div class="dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>

        <span class="white--text">новое слово</span>

        <v-spacer></v-spacer>

        <v-btn dark icon title="Удалить слово из изучаемых">
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
                <p class="text-body-1">
                  {{ wordObject.transcription }}
                </p>
                <div class="text-subtitle-1">{{ wordObject.wordTranslate }}</div>
              </v-card-text>
            </div>
            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="`${prefixImagePath}${wordObject.image}`"></v-img>
            </v-avatar>
          </div>

          <div class="d-flex flex-no-wrap justify-space-between align-center">
            <v-btn icon class="ma-2">
              <v-icon @click="audio.play(wordObject.audioMeaning)">mdi-volume-high</v-icon>
            </v-btn>
            <v-card-text class="text-body-1">
              <p class="text-body-1 mb-2">
                <span v-html="wordObject.textMeaning"></span>
              </p>
              <p class="text-body-2 mb-0">
                {{ wordObject.textMeaningTranslate }}
              </p>
            </v-card-text>
          </div>

          <div class="d-flex flex-no-wrap justify-space-between align-center">
            <v-btn icon class="ma-2">
              <v-icon @click="audio.play(wordObject.audioExample)">mdi-volume-high</v-icon>
            </v-btn>
            <v-card-text class="text-body-1">
              <p class="text-body-1 mb-2"><span v-html="wordObject.textExample"></span></p>
              <p class="text-body-2 mb-0">{{ wordObject.textExampleTranslate }}</p>
            </v-card-text>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text color="indigo accent-4" title="Добавить в раздел сложные слова">
          сложное
        </v-btn>
        <v-btn text color="indigo accent-4" title="Добавить в раздел сложные слова">
          ответ
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="indigo accent-4">
          Далее
        </v-btn>
      </v-card-actions>

      <v-divider></v-divider>

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
  </div>
</template>

<script>
import AudioControl from "@/helpers/english-puzzle/audio-control";
import config from "@/config/config";
import wordsArray from "./learnObjects/wordsArray";

export default {
  data: () => ({
    wordsArray,
    step: 0,
    audio: {},
    prefixImagePath: config.audioBaseUrl,
  }),
  mounted() {
    this.audio = new AudioControl();
    this.audio.play(wordsArray[this.step].audio);
  },
  watch: {
    step: function steps() {
      this.audio.play(wordsArray[this.step].audio);
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
</style>
