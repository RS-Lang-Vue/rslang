<template>
  <div>
    <h2>Savana game's page</h2>
    <h3>learnWords:</h3>
    <div class="learnWords" v-for="word in roundWords.keyWords" :key="word.id">
      {{ word.word }} - {{ word.wordTranslate }}
    </div>
    <h3>randomWords:</h3>
    <div class="randomWords" v-for="word in roundWords.randomWords" :key="word.id">
      {{ word.word }} - {{ word.wordTranslate }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["roundWords"]),
  async mounted() {
    this.$store.dispatch("setGame", "gameSavannah");
    this.$store.dispatch("getRoundWords");
  },
};
</script>

<style></style>
