<template>
  <v-card
    flat
    elevation="8"
    justify="center"
    align="center"
    class="text-center rounded-0 ep-card-height"
    color="rgba(0, 0, 0, 0.2)"
  >
    <draggable class="cards" group="words" v-model="cards" :class="{ 'opacity-cards': isVisible }">
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
    isVisible: {
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
.opacity-cards {
  opacity: 1 !important;
}
.cards {
  display: flex;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.6s linear;
}
</style>
