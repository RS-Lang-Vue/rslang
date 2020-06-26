<template>
  <div>
    <h2>Savana game's page</h2>
    <h3>learnWords:</h3>
    <div class="learnWords" v-for="word in words" :key="word.id">
      {{ word.word }} - {{ word.wordTranslate }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["words"]),
  async mounted() {
    this.$store.dispatch("getFreeWordsPromise", { group: 0, pages: [0, 1] });
  },
};
</script>

<style></style>
