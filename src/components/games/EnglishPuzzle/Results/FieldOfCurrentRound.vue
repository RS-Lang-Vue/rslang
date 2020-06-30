<template>
  <v-card
    flat
    justify="center"
    align="center"
    color="rgba(0, 0, 0, 0.1)"
    class="rounded-0 ep-card-height"
  >
    <draggable
      class="cards"
      v-model="cards"
      group="words"
      @change="onChange"
      :disabled="isPhraseCollected"
    >
      <Card
        v-for="card of cards"
        :key="card.id"
        :card="card"
        :painting="painting"
        :isPhraseCollected="isPhraseCollected"
        v-on:transferCard="transferCard"
      />
    </draggable>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import draggable from "vuedraggable";
import Card from "../Card.vue";

export default {
  components: {
    Card,
    draggable,
  },
  props: {
    isPhraseCollected: {
      type: Boolean,
      required: true,
    },
    painting: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getResultsCardsEP"]),
    cards: {
      get() {
        return this.getResultsCardsEP;
      },
      set(value) {
        this.setResultsCardsEP(value);
      },
    },
  },
  methods: {
    ...mapActions(["setResultsCardsEP"]),
    transferCard(id) {
      this.$emit("transferCard", id);
    },
    onChange(evt) {
      if (evt.removed || evt.moved) this.transferCard(null);
    },
  },
};
</script>

<style lang="scss" scoped>
.cards {
  height: 100%;
  display: flex;
  border: none !important;
}
</style>
