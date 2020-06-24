<template>
  <v-dialog v-model="dialogControl" max-width="290">
    <v-card align="center" justify="center">
      <v-card-title>Level</v-card-title>
      <v-slider
        v-model="group"
        class="align-center ma-5 mb-0"
        color="teal"
        thumb-label="always"
        :thumb-size="24"
        :max="getOptionsEP.numOfGroups"
        :min="0"
        hide-details
      >
        <template v-slot:thumb-label="{ value }">{{ value + 1 }}</template>
      </v-slider>
      <v-card-title>Round</v-card-title>
      <v-slider
        v-model="page"
        class="align-center ma-5 mb-0"
        color="teal"
        thumb-label="always"
        :thumb-size="24"
        :max="getOptionsEP.numOfPagesInGroup"
        :min="0"
        hide-details
      >
        <template v-slot:thumb-label="{ value }">{{ value + 1 }}</template>
      </v-slider>
      <v-card-title>Hints</v-card-title>
      <v-switch v-model="translation" class="ma-2" color="teal" label="Translation"></v-switch>
      <v-switch v-model="audio" class="ma-2" color="teal" label="Speak"></v-switch>
      <v-switch v-model="audioAuto" class="ma-2" color="teal" label="Speak Auto"></v-switch>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal" text @click="closeSettings">Close</v-btn>
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
    ...mapGetters(["getOptionsEP", "getHintOptionsEP"]),
    page: {
      get() {
        return this.getOptionsEP.page;
      },
      set(value) {
        const options = { ...this.getOptionsEP };
        options.page = value;
        this.setOptionsEP(options);
        this.setIsUserChangedRoundEP(true);
      },
    },
    group: {
      get() {
        return this.getOptionsEP.group;
      },
      set(value) {
        this.updateProgressOptionGroup(value);
      },
    },
    translation: {
      get() {
        return this.getHintOptionsEP.showTranslation;
      },
      set() {
        this.updateHintOptionsEP("showTranslation");
      },
    },
    audio: {
      get() {
        return this.getHintOptionsEP.showAudio;
      },
      set() {
        this.updateHintOptionsEP("showAudio");
      },
    },
    audioAuto: {
      get() {
        return this.getHintOptionsEP.autoPlayAudio;
      },
      set() {
        this.updateHintOptionsEP("autoPlayAudio");
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
  created() {
    this.updateSettingsFromLocaleStorage();
  },
  methods: {
    ...mapActions([
      "setOptionsEP",
      "setHintOptionsEP",
      "logoutUser",
      "fetchRoundsPerLevelCountEP",
      "setIsUserChangedRoundEP",
    ]),
    updateHintOptionsEP(option) {
      const options = { ...this.getHintOptionsEP };
      options[option] = !options[option];
      this.setHintOptionsEP(options);
      localStorage.setItem("englishPuzzleHintOptions", JSON.stringify(options));
    },
    async updateSettingsFromLocaleStorage() {
      const hints = localStorage.getItem("englishPuzzleHintOptions");
      if (hints) this.setHintOptionsEP(JSON.parse(hints));
      let options = localStorage.getItem("englishPuzzleRounds");
      if (options) {
        this.setOptionsEP(JSON.parse(options));
      } else {
        options = { ...this.getOptionsEP };
        options.numOfPagesInGroup = await this.fetchRoundsPerLevelCountEP(0);
        this.setOptionsEP(options);
      }
    },
    async updateProgressOptionGroup(value) {
      const options = { ...this.getOptionsEP };
      options.numOfPagesInGroup = await this.fetchRoundsPerLevelCountEP(value);
      options.group = value;
      options.page = 0;
      this.setOptionsEP(options);
      this.setIsUserChangedRoundEP(true);
    },
    closeSettings() {
      this.$emit("closeSettings");
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-option {
  width: 65px;
  margin-right: 10px;
}
</style>
