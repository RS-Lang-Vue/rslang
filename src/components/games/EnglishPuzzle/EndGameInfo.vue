<template>
  <v-dialog v-model="dialogControl" scrollable max-width="500">
    <v-card justify="center">
      <v-card-title class="painting-title pt-0">Игра окончена</v-card-title>
      <v-card-text>
        Поздравляем с прохождением финального раунда игры EnglishPuzzle! При закрытии этого окна,
        раунд будет перезапущен, но Вы сможете выбрать любой другой в меню настроек.
      </v-card-text>
      <div class="emblem-wrap">
        <Emblem />
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeEndGameInfo">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Emblem from "@/components/common/Emblem.vue";

export default {
  components: {
    Emblem,
  },
  props: {
    isShowEndGameInfo: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeEndGameInfo() {
      this.$emit("closeEndGameInfo");
    },
  },
  computed: {
    dialogControl: {
      get() {
        return this.isShowEndGameInfo;
      },
      set() {
        this.closeEndGameInfo();
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
