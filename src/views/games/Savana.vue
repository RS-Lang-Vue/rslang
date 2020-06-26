<template>
  <div>
    <h2>Savana game's page</h2>
    <h3>learnWords:</h3>
    <div class="learnWords" v-for="word in words.learningWords" :key="word.id">
      {{ word.word }} - {{ word.wordTranslate }}
    </div>
    <h3>randomWords:</h3>
    <div class="randomWords" v-for="word in words.randomWords" :key="word.id">
      {{ word.word }} - {{ word.wordTranslate }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["words"]),
  async mounted() {
    this.$store.dispatch("getFreeWords", {
      group: 0,
      firstWordNum: 17,
      learningWordsCount: 17,
      randomWordsCount: 17,
    });
  },
};
</script>

<style></style>
