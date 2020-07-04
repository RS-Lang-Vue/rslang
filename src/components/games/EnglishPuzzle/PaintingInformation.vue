<template>
  <v-card flat color="transparent">
    <v-card-title class="painting-title pt-0">{{ painting.author }}</v-card-title>
    <v-card-subtitle class="pb-0">{{ painting.name }}, {{ painting.year }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    painting: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.painting-title {
  justify-content: center;
  word-break: normal;
}
</style>
