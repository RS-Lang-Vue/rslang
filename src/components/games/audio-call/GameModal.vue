<template>
  <div class="game-modal">
    <v-btn fab color="success" small class="game-modal__close-btn" @click.prevent="close">
      <v-icon class="game-modal__icon">mdi-close</v-icon>
    </v-btn>
    <p class="game-modal__level">{{ goneLevel }} уровень</p>
    <main class="game-modal__main">
      <v-stepper v-model="e1" @change="reset">
        <v-stepper-header>
          <template v-for="(word, index) in words">
            <v-stepper-step
              :key="index"
              :complete="e1 > index + 1"
              :step="index + 1"
            ></v-stepper-step>
            <v-divider v-if="index + 1 !== words.length" :key="word.id"></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content v-for="(word, index) in words" :key="index" :step="index + 1">
            <v-card class="game-modal__card mb-10" height="400px">
              <div class="game-modal__word-image-wrap">
                <div
                  v-if="!isImageShow"
                  @click="isImageShow = !isImageShow"
                  class="game-modal__word-show-image"
                >
                  <span>Показать картинку</span>
                </div>
                <v-img :src="word.image" class="game-modal__word-image"></v-img>
              </div>
              <p class="mt-5">{{ word.word }} - {{ word.transcription }}</p>
              <div class="game-modal__word-audio-play" @click="playAudio(index)"></div>
              <audio controls :ref="index" class="game-modal__word-audio mb-5">
                <source :src="word.audio" type="audio/mpeg" />
                <p>Ваш браузер не поддерживает HTML5 аудио.</p>
                <p>
                  Вот взамен
                  <a :href="word.audio" target="_blank">ссылка на аудио</a>
                </p>
              </audio>
              <v-radio-group row class="game-modal__answers justify-center">
                <v-radio
                  v-for="answerWord in getAnswerWords"
                  :key="answerWord.id"
                  class="px-5"
                  :label="answerWord.wordTranslate"
                  :color="isAnswerCorrect ? 'success' : 'error'"
                  :value="answerWord"
                  @change="setUserAnswer({ [word.word]: answerWord.word })"
                ></v-radio>
              </v-radio-group>
              <!-- <pre>{{ word.audio }}</pre> -->
            </v-card>
            <v-btn color="primary" @click="prevStep(index)" class="mx-2">Предыдущее</v-btn>
            <v-btn color="primary" @click="nextStep(index + 1)" class="mx-2">Следующее</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </main>
    <!-- {{ getCurrentWord.word }} -->
    <br />
    <!-- > {{ getAnswerWords }} -->
    <div class="game-modal__word-pages">
      <v-alert v-if="isInfoAlertOpen" class="game-modal__info" type="info">
        Для Вашего удобства мы разделили слова на 30 групп из 20 слов.
        <v-icon class="ml-10" left @click.prevent="closeInfoAlert">mdi-close-circle</v-icon>
      </v-alert>
      <v-btn
        v-for="(wordPage, index) in 30"
        :key="index"
        :label="`${wordPage}`"
        color="success"
        :value="index"
        @click.prevent="selectWordPage(index)"
        class="game-modal__word-pages-btn"
        v-text="wordPage"
      ></v-btn>
    </div>
  </div>
</template>

<script>
import URL from "@/config/config";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isInfoAlertOpen: true,
      e1: 1,
      editable: true,
      steps: 2,
      currentWord: null,
      answerWords: [],
      userAnswer: {},
      isAnswerCorrect: false,
      isDisabled: false,
      isImageShow: false,
      isNewWordsDownload: false,
    };
  },
  methods: {
    ...mapActions({
      fetchWords: "fetchWords",
    }),
    close() {
      this.isInfoAlertOpen = true;
      this.$store.commit("SET_IS_AUDIO_CALL_STARTED", false);
    },
    async selectWordPage(page) {
      try {
        this.$store.commit("SET_IS_AUDIO_CALL_PAGE_LOADING", true);
        await this.fetchWords({ group: this.currentLevel, page });
        this.generateRandomWords();
        this.e1 = 1;
        this.isNewWordsDownload = true;
      } catch (error) {
        /* console.log(error); */
      } finally {
        this.$store.commit("SET_IS_AUDIO_CALL_PAGE_LOADING", false);
        this.reset();
      }
    },
    closeInfoAlert() {
      this.isInfoAlertOpen = false;
    },
    prevStep(n) {
      this.currentWord = this.words[n ? n - 1 : 0];
      this.generateRandomWords();
      if (n === 0) {
        // console.log("start");
      } else {
        this.e1 = n;
      }
    },
    nextStep(n) {
      this.currentWord = this.words[n !== this.words.length ? n : this.words.length - 1];
      this.generateRandomWords();
      if (n === this.words.length) {
        // console.log("done");
      } else {
        this.e1 = n + 1;
      }
      this.reset();
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    shuffle(arr = []) {
      return arr.sort(() => 0.5 - Math.random());
    },
    generateRandomWords() {
      const words = this.words.filter((el) => el.word !== this.getCurrentWord.word);
      const numberOfWords = 4;
      const randomWords = [];
      let i = 0;
      while (i < numberOfWords) {
        const number = this.getRandomInt(words.length);
        const doseIncudes = (el) => el.word === words[number].word;
        if (!randomWords.some(doseIncudes)) {
          randomWords.push(words[number]);
          i += 1;
        }
      }
      this.shuffle((this.answerWords = [...randomWords, this.getCurrentWord]));
    },
    setUserAnswer(obj) {
      try {
        // console.log("OBJ: ", obj);
        this.isAnswered = true;
        this.isAnswerCorrect = false;
        this.userAnswer = {
          ...this.userAnswer,
          ...obj,
        };
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(obj)) {
          // console.log(`${key}: ${value}`, key === value);
          if (key === value) {
            this.isAnswerCorrect = true;
          }
        }
        // console.log(this.userAnswer);
      } catch (error) {
        /* console.log(error); */
      } finally {
        this.isDisabled = true;
      }
    },
    playAudio(index) {
      this.$refs[index][0].play();
    },
    reset() {
      this.isAnswered = false;
      this.isDisabled = false;
      this.isAnswerCorrect = false;
      this.isImageShow = false;
      this.currentWord = null;
    },
  },
  computed: {
    ...mapGetters({
      words: "GET_WORDS",
      goneLevel: "GET_AUDIO_CALL_GONE_LEVEL",
      wordPage: "GET_AUDIO_CALL_WORD_PAGE",
      currentLevel: "GET_AUDIO_CALL_CURRENT_LEVEL",
    }),
    getCurrentWord() {
      if (this.currentWord) return this.currentWord;
      return this.words[0];
    },
    getAnswerWords() {
      if (this.answerWords.length) return this.answerWords;
      this.generateRandomWords();
      return this.answerWords;
    },
    url() {
      return URL;
    },
  },
  watch: {
    e1(val) {
      this.$refs[val - 1][0].load();
    },
    isNewWordsDownload() {
      this.$refs[0][0].load();
      this.isNewWordsDownload = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$text: #333;
.game-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(white, 1);
  display: flex;
  justify-content: center;
  padding-top: 15vh;
  &__main {
    position: relative;
    width: 1020px;
    max-height: 600px;
    // border: 1px dashed red;
  }
  &__close-btn {
    position: absolute;
    top: 2rem;
    right: 2rem;
    &:hover .game-modal__icon {
      transform: rotate(90deg);
    }
  }
  &__info {
    position: absolute;
    top: -4.5rem;
  }
  &__level {
    position: absolute;
    top: 2rem;
    left: 2rem;
    font-weight: bold;
  }
  &__word-pages {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    max-width: 1020px;
    position: absolute;
    bottom: 3rem;
    // &::before {
    //   content: "Выберите группу слов";
    //   position: absolute;
    //   top: -2rem;
    //   font-weight: bold;
    //   color: $text;
    // }
    &-btn {
      margin: 3px 0;
    }
  }
  &__card {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.1) !important;
  }
  &__word-image-wrap {
    position: relative;
    width: 130px;
    height: 130px;
    margin: 0 auto;
  }
  &__word-show-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: grey;
    z-index: 10;
    cursor: pointer;
  }
  &__word-image {
    width: 130px;
    height: 130px;
    margin: 0 auto;
  }
  &__word-audio {
    display: none;
    &-play {
      position: relative;
      width: 50px;
      height: 50px;
      background-color: hotpink;
      margin: 0 auto;
      cursor: pointer;
      border-radius: 50%;
      margin-bottom: 10px;
      &::before {
        content: "";
        width: 18px;
        height: 20px;
        position: absolute;
        top: 15px;
        left: 19px;
        clip-path: polygon(0 0, 100% 50%, 0 100%);
        background-color: #fff;
      }
    }
  }
  &__answers {
    width: fit-content;
    margin: 0 auto;
  }
}
</style>
