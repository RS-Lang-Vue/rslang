<template>
  <v-dialog v-model="dialogControl" max-width="290">
    <v-card align="center" justify="center">
      <v-switch
        :value="learned"
        class="ma-0 pt-5"
        color="primary"
        label="Повторять изученные"
        @change="changeLearned"
      ></v-switch>
      <v-divider inset></v-divider>
      <v-card elevation="0" :disabled="learned || loading">
        <v-card-title>Уровень</v-card-title>
        <v-slider
          :value="level"
          class="align-center ma-5 mb-0"
          color="primary"
          thumb-label="always"
          :thumb-size="24"
          :max="getSettingsFP.levelCount"
          :min="0"
          hide-details
          @end="updateLevel"
        >
          <template v-slot:thumb-label="{ value }">{{ value + 1 }}</template>
        </v-slider>
        <v-card-title>Раунд</v-card-title>
        <v-slider
          :value="round"
          class="align-center ma-5 mb-0"
          color="primary"
          thumb-label="always"
          :thumb-size="24"
          :max="getSettingsFP.roundsInLevelCount"
          :min="0"
          hide-details
          @end="updateRound"
        >
          <template v-slot:thumb-label="{ value }">{{ value + 1 }}</template>
        </v-slider>
      </v-card>
      <v-card-title>Сложность игры</v-card-title>
      <v-slider
        v-model="complexity"
        class="align-center ma-5 mt-0"
        color="primary"
        :max="2"
        :min="0"
        hide-details
        :tick-labels="setOfDifficulties"
        tick-size="4"
      >
      </v-slider>
      <v-card-title>Подсказки</v-card-title>
      <v-switch v-model="audio" class="ma-2" color="primary" label="Произношение"></v-switch>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeSettings">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    isShowSettings: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      setOfDifficulties: ["легко", "средне", "трудно"],
    };
  },
  computed: {
    ...mapGetters(["getSettingsFP", "loading"]),
    round() {
      return this.getSettingsFP.round[this.getSettingsFP.level];
    },
    level() {
      return this.getSettingsFP.level;
    },
    learned() {
      return this.getSettingsFP.learned;
    },
    audio: {
      get() {
        return this.getSettingsFP.audio;
      },
      set(value) {
        this.updateOptions("audio", value);
      },
    },
    complexity: {
      get() {
        return this.getSettingsFP.complexity;
      },
      set(value) {
        this.updateOptions("complexity", value);
      },
    },
    dialogControl: {
      get() {
        return this.isShowSettings;
      },
      set() {
        this.closeSettings();
      },
    },
  },
  methods: {
    ...mapActions(["setSettingsFP", "setIsUserChangedRoundFP"]),
    updateOptions(option, value) {
      const options = { ...this.getSettingsFP };
      options[option] = value;
      this.setSettingsFP(options);
    },
    updateRound(value) {
      const options = { ...this.getSettingsFP };
      options.round[options.level] = value;
      this.setSettingsFP(options);
      this.setIsUserChangedRoundFP(true);
    },
    updateLevel(value) {
      this.updateOptions("level", value);
      this.setIsUserChangedRoundFP(true);
    },
    closeSettings() {
      this.$emit("closeSettings");
    },
    changeLearned(value) {
      this.$emit("changeLearned", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-option {
  width: 65px;
  margin-right: 10px;
}
.hint-picture {
  @media (max-width: 800px) {
    display: none;
  }
}
</style>
