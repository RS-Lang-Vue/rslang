<template>
  <v-list
    class="completed-rounds-list pa-0"
    :style="{ background: `url(${painting.cutSrc}) top/cover no-repeat rgba(0,0,0,0.2)` }"
  >
    <v-list-item
      class="completed-rounds-item pa-0"
      v-for="(item, i) of arrayOfCardsOfCompletedRounds"
      :key="i"
    >
      <ItemForCompletedRoundsList :phrase="item" />
    </v-list-item>
  </v-list>
</template>

<script>
import ItemForCompletedRoundsList from "./ItemForCompletedRoundsList.vue";

export default {
  components: {
    ItemForCompletedRoundsList,
  },
  props: {
    arrayOfCardsOfCompletedRounds: {
      type: Array,
      required: true,
    },
    painting: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.completed-rounds-list {
  background-blend-mode: multiply;
}
.completed-rounds-item {
  min-height: auto;
}
</style>
