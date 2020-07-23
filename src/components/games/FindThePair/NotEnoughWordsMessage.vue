<template>
  <v-dialog v-model="dialogControl" scrollable max-width="500">
    <v-card justify="center">
      <v-card-title class="painting-title pt-0">Информация</v-card-title>
      <v-card-text>
        Для режима повторения не хватает изученных слов.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeMessage">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isEnoughWords: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeMessage() {
      this.$emit("closeMessage");
    },
  },
  computed: {
    dialogControl: {
      get() {
        return this.isEnoughWords;
      },
      set() {
        this.closeMessage();
      },
    },
  },
};
</script>

<style scoped>
.emblem-wrap {
  position: relative;
  height: 200px;
}
</style>
