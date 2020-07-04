<template>
  <v-card
    flat
    height="45"
    justify="center"
    align="center"
    color="rgba(0, 0, 0, 0.2)"
    class="rounded-0"
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
      if (evt.removed) this.transferCard(null);
    },
  },
};
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
}
</style>
