<template>
  <v-dialog v-model="dialogControl" max-width="290">
    <v-card align="center" justify="center">
      <v-card-title>Level</v-card-title>
      <v-slider
        v-model="group"
        class="align-center ma-5 mb-0"
        color="primary"
        thumb-label="always"
        :thumb-size="24"
        :max="getSettingsEP.levelCount"
        :min="0"
        hide-details
      >
        <template v-slot:thumb-label="{ value }">{{ value + 1 }}</template>
      </v-slider>
      <v-card-title>Round</v-card-title>
      <v-slider
        v-model="round"
        class="align-center ma-5 mb-0"
        color="primary"
        thumb-label="always"
        :thumb-size="24"
        :max="getSettingsEP.roundsInLevelCount"
        :min="0"
        hide-details
      >
        <template v-slot:thumb-label="{ value }">{{ value + 1 }}</template>
      </v-slider>
      <v-card-title>Hints</v-card-title>
      <v-switch v-model="translation" class="ma-2" color="primary" label="Translation"></v-switch>
      <v-switch
        v-model="picture"
        class="ma-2 hint-picture"
        color="primary"
        label="Background picture"
      ></v-switch>
      <v-switch v-model="audio" class="ma-2" color="primary" label="Speak"></v-switch>
      <v-switch v-model="audioAuto" class="ma-2" color="primary" label="Speak Auto"></v-switch>
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
  computed: {
    ...mapGetters(["getSettingsEP"]),
    round: {
      get() {
        return this.getSettingsEP.round[this.getSettingsEP.level];
      },
      set(value) {
        const options = { ...this.getSettingsEP };
        options.round[options.level] = value;
        this.setSettingsEP(options);
        this.setIsUserChangedRoundEP(true);
      },
    },
    group: {
      get() {
        return this.getSettingsEP.level;
      },
      set(value) {
        this.updateProgressOptionLevel(value);
      },
    },
    translation: {
      get() {
        return this.getSettingsEP.hints.translation;
      },
      set() {
        this.updateHintSettingsEP("translation");
      },
    },
    picture: {
      get() {
        return this.getSettingsEP.hints.showBackground;
      },
      set() {
        this.updateHintSettingsEP("showBackground");
      },
    },
    audio: {
      get() {
        return this.getSettingsEP.hints.speak;
      },
      set() {
        this.updateHintSettingsEP("speak");
      },
    },
    audioAuto: {
      get() {
        return this.getSettingsEP.hints.speakAuto;
      },
      set() {
        this.updateHintSettingsEP("speakAuto");
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
    ...mapActions([
      "setSettingsEP",
      "logoutUser",
      "fetchRoundsPerLevelCountEP",
      "setIsUserChangedRoundEP",
    ]),
    updateHintSettingsEP(option) {
      const options = { ...this.getSettingsEP };
      options.hints[option] = !options.hints[option];
      this.setSettingsEP(options);
      localStorage.setItem("englishPuzzleSettings", JSON.stringify(options));
    },
    updateProgressOptionLevel(value) {
      this.fetchRoundsPerLevelCountEP(value)
        .then(() => {
          const options = { ...this.getSettingsEP };
          options.level = value;
          this.setSettingsEP(options);
          this.setIsUserChangedRoundEP(true);
        })
        .catch((err) => {
          this.showAlert("error", "Error", err.message);
        });
    },
    closeSettings() {
      this.$emit("closeSettings");
    },
    showAlert(type, title, text) {
      this.$notify({
        group: "main",
        type,
        title,
        text,
      });
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
