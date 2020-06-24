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
        :max="getRequestOptionsEP.numOfGroups"
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
        :max="getRequestOptionsEP.numOfPagesInGroup"
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
    ...mapGetters(["getRequestOptionsEP", "getHintOptionsEP"]),
    page: {
      get() {
        return this.getRequestOptionsEP.page;
      },
      set(value) {
        const options = { ...this.getRequestOptionsEP };
        options.page = value;
        this.setRequestOptionsEP(options);
        this.setIsUserChangedRoundEP(true);
      },
    },
    group: {
      get() {
        return this.getRequestOptionsEP.group;
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
      "setRequestOptionsEP",
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
        this.setRequestOptionsEP(JSON.parse(options));
      } else {
        options = { ...this.getRequestOptionsEP };
        options.numOfPagesInGroup = await this.fetchRoundsPerLevelCountEP(0);
        this.setRequestOptionsEP(options);
      }
    },
    async updateProgressOptionGroup(value) {
      const options = { ...this.getRequestOptionsEP };
      options.numOfPagesInGroup = await this.fetchRoundsPerLevelCountEP(value);
      options.group = value;
      options.page = 0;
      this.setRequestOptionsEP(options);
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
