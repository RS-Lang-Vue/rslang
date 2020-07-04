<template>
  <v-list class="completed-cards pa-0" height="45">
    <v-list-item class="completed-card pa-0" v-for="(card, i) of phrase" :key="i">
      {{ card }}
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
  box-sizing: border-box;
  min-height: auto;
  justify-content: center;
  font-size: 10px;
  border: 1px solid #00000033;
  @media (min-width: 375px) {
    font-size: 12px;
  }
  @media (min-width: 600px) {
    font-size: 16px;
  }
}
</style>
