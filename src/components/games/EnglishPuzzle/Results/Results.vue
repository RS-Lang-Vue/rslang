<template>
  <v-card
    flat
    elevation="8"
    color="rgba(0, 0, 0, 0.2)"
    height="450"
    :style="isEndRound ? { background: `url(${painting.cutSrc}) top/cover no-repeat` } : ''"
  >
    <CompletedRoundsListForResults
      :arrayOfCardsOfCompletedRounds="arrayOfCardsOfCompletedRounds"
      :painting="painting"
    />
    <FieldOfCurrentRound
      :class="{ invisible: isEndRound }"
      :isPhraseCollected="isPhraseCollected"
      v-on:transferCard="transferCard"
    />
  </v-card>
</template>

<script>
import CompletedRoundsListForResults from "./CompletedRoundsListForResults.vue";
import FieldOfCurrentRound from "./FieldOfCurrentRound.vue";

export default {
  components: {
    CompletedRoundsListForResults,
    FieldOfCurrentRound,
  },
  props: {
    isPhraseCollected: {
      type: Boolean,
      required: true,
    },
    isEndRound: {
      type: Boolean,
      required: true,
    },
    arrayOfCardsOfCompletedRounds: {
      type: Array,
      required: true,
    },
    painting: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  methods: {
    transferCard(id) {
      this.$emit("transferCard", id);
    },
  },
};
</script>
