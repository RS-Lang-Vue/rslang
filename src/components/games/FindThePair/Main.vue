<template>
  <div
    align="center"
    justify="center"
    class="fill-height text-sm-body-2 text-md-body-1 text-lg-subtitle-1"
  >
    <v-speed-dial absolute right top class="game-btn">
      <template v-slot:activator>
        <v-btn dark class="game-btn" color="transparent" @click.stop="isShowGameStatistics = true">
          <v-icon>mdi-chart-bar</v-icon>
        </v-btn>
        <v-btn dark class="game-btn" color="transparent" @click.stop="isShowSettings = true">
          <v-icon>mdi-cog-outline</v-icon>
        </v-btn>
      </template>
    </v-speed-dial>
    <Settings :isShowSettings="isShowSettings" v-on:closeSettings="isShowSettings = false" />
    <v-card
      class="game-content text-center"
      dark
      flat
      color="transparent"
      max-width="800"
      min-width="290"
    >
      <v-card class="pa-5" color="transparent" flat>
        <v-btn icon @click="isAutoPlay = !isAutoPlay">
          <v-icon large v-if="isAutoPlay">mdi-volume-high</v-icon>
          <v-icon large v-else>mdi-volume-off</v-icon>
        </v-btn>
      </v-card>
      <PlayField :cardsArray="cardsArray" :isAutoPlay="isAutoPlay" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PlayField from "@/components/games/FindThePair/PlayField/PlayField.vue";
import Settings from "@/components/games/FindThePair/Settings.vue";
import Card from "@/helpers/find-the-pair/card";
import AudioControl from "@/helpers/audio-control";

export default {
  components: {
    PlayField,
    Settings,
  },
  data() {
    return {
      cardsArray: [],
      fab: false,
      isShowSettings: false,
      isAutoPlay: true,
    };
  },
  computed: {
    ...mapGetters(["getWordsForRoundFP", "getSettingsFP"]),
  },
  watch: {
    getIsUserChangedRoundFP() {
      if (this.getIsUserChangedRoundFP) this.startNewRound();
    },
  },
  async mounted() {
    await this.downloadSettingsFP();
    this.audio = new AudioControl();
    this.startNewRound();
  },
  methods: {
    ...mapActions([
      "fetchWordsForRoundFP",
      "setSettingsFP",
      "setIsUserChangedRoundFP",
      "downloadSettingsFP",
    ]),
    startNewRound() {
      this.fetchWordsForRoundFP(this.getSettingsFP)
        .then(() => {
          this.placeСards();
          this.setIsUserChangedRoundFP(false);
        })
        .catch((err) => {
          this.showAlert("error", "Error", err.message);
        });
    },
    placeСards() {
      const words = this.getWordsForRoundFP;
      const cardsImages = [];
      const cardsText = [];
      words.forEach((item) => {
        cardsImages.push(new Card(item, true));
        cardsText.push(new Card(item));
      });
      this.cardsArray = [...cardsImages, ...cardsText].sort(() => Math.random() - 0.5);
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
.game-content {
  width: 290px;
  @media (min-width: 340px) {
    width: auto;
  }
}
</style>
