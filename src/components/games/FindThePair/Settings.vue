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
        :max="getSettingsFP.levelCount"
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
        :max="getSettingsFP.roundsInLevelCount"
        :min="0"
        hide-details
      >
        <template v-slot:thumb-label="{ value }">{{ value + 1 }}</template>
      </v-slider>
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
    ...mapGetters(["getSettingsFP"]),
    round: {
      get() {
        return this.getSettingsFP.round[this.getSettingsFP.level];
      },
      set(value) {
        const options = { ...this.getSettingsFP };
        options.round[options.level] = value;
        this.setSettingsFP(options);
        this.setIsUserChangedRoundFP(true);
      },
    },
    group: {
      get() {
        return this.getSettingsFP.level;
      },
      set(value) {
        const options = { ...this.getSettingsFP };
        options.level = value;
        this.setSettingsFP(options);
        this.setIsUserChangedRoundFP(true);
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
