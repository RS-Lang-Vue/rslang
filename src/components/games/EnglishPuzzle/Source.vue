<template>
  <v-card
    flat
    elevation="8"
    height="45"
    justify="center"
    align="center"
    class="text-center rounded-0"
    color="rgba(0, 0, 0, 0.2)"
  >
    <draggable class="cards" group="words" v-model="cards" ref="cards">
      <Card
        v-for="card of cards"
        :key="card.id"
        :card="card"
        :painting="painting"
        :currentPhraseNumber="currentPhraseNumber"
        v-on:transferCard="transferCard"
      />
    </draggable>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import draggable from "vuedraggable";
import Card from "./Card.vue";

export default {
  components: {
    Card,
    draggable,
  },
  props: {
    isEndRound: {
      type: Boolean,
      required: true,
    },
    painting: {
      type: Object,
      required: true,
    },
    currentPhraseNumber: {
      type: Number,
    },
  },
  computed: {
    ...mapGetters(["getSourceCardsEP"]),
    cards: {
      get() {
        return this.getSourceCardsEP;
      },
      set(value) {
        this.setSourceCardsEP(value);
      },
    },
  },
  methods: {
    ...mapActions(["setSourceCardsEP"]),
    transferCard(id) {
      this.$emit("transferCard", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  justify-content: center;
}
</style>
