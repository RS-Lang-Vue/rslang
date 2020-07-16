<template>
  <v-card
    class="field-wrap mb-5"
    :style="
      bgField
        ? {
            background: `url(${bgField}) center/cover no-repeat rgba(0,0,0,0.2)`,
          }
        : { background: `rgba(0, 0, 0, 0.2)` }
    "
  >
    <v-card class="playing-field" flat elevation="8" :disabled="isInit">
      <Card
        v-for="card of cardsArray"
        :key="card.key"
        :card="card"
        :isShirtCard="isShirtCard"
        :flipAvailable="flipAvailable"
        :deletedCard="deletedCard(card.id)"
        v-on:checkCards="checkCards"
        v-on:playAudio="playAudio"
      />
    </v-card>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Card from "@/components/games/FindThePair/PlayField/Card.vue";
import AudioControl from "@/helpers/audio-control";

export default {
  components: {
    Card,
  },
  props: {
    cardsArray: {
      type: Array,
      required: true,
    },
    bgField: {
      type: String,
      required: true,
    },
    isClearGameState: {
      type: Boolean,
      required: true,
    },
    isTimeOver: {
      type: Boolean,
      required: true,
    },
    isInit: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      flippedСardsCount: 0,
      guessedСards: [],
      stack: [],
      isShirtCard: false,
      audio: {},
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    flipAvailable() {
      return this.flippedСardsCount < 2;
    },
    isEndRound() {
      return this.guessedСards.length === 10;
    },
  },
  watch: {
    isClearGameState() {
      if (this.isClearGameState) this.clearGameState();
    },
    isTimeOver() {
      if (this.isTimeOver) this.finishGame();
    },
  },
  mounted() {
    this.audio = new AudioControl();
  },
  methods: {
    ...mapActions(["addAnswerResult"]),
    checkCards(id) {
      this.flippedСardsCount += 1;
      this.stack.push(id);
      if (this.flippedСardsCount === 2) {
        setTimeout(() => {
          if (this.stack[0] === this.stack[1]) {
            this.guessedСards.push(id);
            if (this.isLoggedIn) {
              this.addAnswerResult({ wordId: id, isCorrectAnswer: true });
            }
            if (this.isEndRound) this.finishGame();
          } else {
            this.isShirtCard = true;
            setTimeout(() => {
              this.isShirtCard = false;
            }, 0);
          }
          this.stack = [];
          this.flippedСardsCount = 0;
        }, 1300);
      }
    },
    deletedCard(id) {
      return this.guessedСards.includes(id);
    },
    finishGame() {
      this.isShirtCard = false;
      setTimeout(() => {
        this.isShirtCard = true;
      }, 0);
      this.$emit("endRound", this.guessedСards);
    },
    clearGameState() {
      this.guessedСards = [];
      this.stack = [];
      this.flippedСardsCount = 0;
    },
    playAudio(value) {
      this.audio.play(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.field-wrap {
  background-blend-mode: multiply;
  overflow: hidden;

  transition: background 0.7s ease;
}
.playing-field {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2px;
  height: 213px !important;
  background: transparent;
  padding: 2px;
  @media (min-width: 375px) {
    height: 250px !important;
  }
  @media (min-width: 600px) {
    gap: 4px;
    height: 400px !important;
  }
  @media (min-width: 735px) {
    height: 533px !important;
  }
}
</style>
