<template>
  <v-list
    class="completed-rounds-list pa-0"
    :style="{ background: `url(${painting.cutSrc}) top no-repeat` }"
  >
    <v-list-item
      class="completed-rounds-item pa-0"
      v-for="(item, i) of arrayOfCardsOfCompletedRounds"
      :key="i"
    >
      <ItemForCompletedRoundsList :phrase="item" :painting="painting" />
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
  background-size: auto 300px !important;
  @media (min-width: 375px) {
    background-size: auto 350px !important;
  }
  @media (min-width: 600px) {
    background-size: auto 400px !important;
  }
  @media (min-width: 735px) {
    background-size: auto 450px !important;
  }
  @media (min-width: 851px) {
    background: transparent !important;
  }
}
.completed-rounds-item {
  min-height: auto;
}
</style>
