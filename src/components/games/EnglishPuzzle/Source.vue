<template>
  <v-card
    flat
    elevation="8"
    justify="center"
    align="center"
    class="text-center rounded-0 ep-card-height"
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
        :class="{ invisible: !visibility }"
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
  data() {
    return {
      visibility: false,
    };
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
  mounted() {
    setTimeout(() => {
      this.visibility = true;
    }, 300);
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
