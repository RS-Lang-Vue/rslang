<template>
  <v-list class="completed-cards pa-0">
    <v-list-item
      class="completed-card pa-0 ep-card-height"
      v-for="(card, i) of phrase"
      :key="i"
      :style="{ width: card.width }"
    >
      {{ card.word }}
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    phrase: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.completed-cards {
  width: 100%;
  display: flex;
  background-color: transparent !important;
}
.completed-card {
  flex: auto !important;
  box-sizing: border-box;
  min-height: auto;
  justify-content: center;
  font-size: 10px;
  border: none !important;
  box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);
  @media (min-width: 375px) {
    font-size: 12px;
  }
  @media (min-width: 600px) {
    font-size: 16px;
  }
}
</style>
