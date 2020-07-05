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
      <PlayField
        :cardsArray="cardsArray"
        :isAutoPlay="isAutoPlay"
        :isClearGameState="isClearGameState"
        :bgField="bgField"
        @endRound="endRound"
      />
      <RoundStatistics
        :isShowResultsRound="isShowResultsRound"
        :statisticsObject="statisticsObject"
        v-on:closeRoundStatistics="isShowResultsRound = false"
        v-on:continueGame="goToNextRound"
        v-on:openGameStatistics="isShowGameStatistics = true"
      />
      <GameStatistics
        :isShowGameStatistics="isShowGameStatistics"
        v-on:closeGameStatistics="isShowGameStatistics = false"
      />
      <EndGameInfo :isShowEndGameInfo="isShowFinalInfo" v-on:closeEndGameInfo="closeEndGameInfo" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="startRound" class="game-btn">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-btn
          v-if="isEndRound"
          color="primary"
          @click="isShowResultsRound = true"
          class="game-btn"
        >
          Результат
        </v-btn>
        <v-btn
          v-if="isСontinueButtonAccessibility"
          color="primary"
          @click="goToNextRound"
          class="game-btn"
        >
          Продолжить
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PlayField from "@/components/games/FindThePair/PlayField/PlayField.vue";
import Settings from "@/components/games/FindThePair/Settings.vue";
import RoundStatistics from "@/components/games/FindThePair/RoundStatistics.vue";
import GameStatistics from "@/components/games/FindThePair/GameStatistics.vue";
import EndGameInfo from "@/components/games/FindThePair/EndGameInfo.vue";
import Card from "@/helpers/find-the-pair/card";
import StatisticsItem from "@/helpers/find-the-pair/statistics-item";
import StatisticsObject from "@/helpers/find-the-pair/statistics-object";

export default {
  components: {
    PlayField,
    Settings,
    EndGameInfo,
    RoundStatistics,
    GameStatistics,
  },
  data() {
    return {
      cardsArray: [],
      cardsText: [],
      isShowSettings: false,
      isAutoPlay: true,
      isEndRound: false,
      isEndGame: false,
      isShowFinalInfo: false,
      isClearGameState: false,
      isShowResultsRound: false,
      isShowGameStatistics: false,
      statisticsObject: {},
      bgField: "",
    };
  },
  computed: {
    ...mapGetters([
      "getWordsForRoundFP",
      "getSettingsFP",
      "getIsUserChangedRoundFP",
      "getStatisticsFP",
      "getImagesUnsplash",
    ]),
    isСontinueButtonAccessibility() {
      return this.isEndRound && !this.isEndGame;
    },
  },
  watch: {
    getIsUserChangedRoundFP() {
      if (this.getIsUserChangedRoundFP) this.startRound();
    },
  },
  async mounted() {
    await this.downloadSettingsFP();
    this.updateStatisticsFPFromLocaleStorage();
    this.startRound();
  },
  methods: {
    ...mapActions([
      "fetchWordsForRoundFP",
      "setSettingsFP",
      "setIsUserChangedRoundFP",
      "downloadSettingsFP",
      "setStatisticsFP",
      "uploadSettings",
      "fetchImagesUnsplash",
    ]),
    startRound() {
      this.clearGameState();
      this.statisticsObject = new StatisticsObject();
      this.fetchWordsForRoundFP(this.getSettingsFP)
        .then(() => {
          this.placeСards();
          this.setIsUserChangedRoundFP(false);
        })
        .catch((err) => {
          this.showAlert("error", "Error", err.message);
        });
      setTimeout(() => {
        this.setBgField();
      }, 100);
    },
    placeСards() {
      const words = this.getWordsForRoundFP;
      const cardsImages = [];
      words.forEach((item) => {
        cardsImages.push(new Card(item, true));
        this.cardsText.push(new Card(item));
      });
      this.cardsArray = [...cardsImages, ...this.cardsText].sort(() => Math.random() - 0.5);
    },
    clearGameState() {
      this.cardsText = [];
      this.cardsArray = [];
      this.isEndRound = false;
      this.isEndGame = false;
      this.isClearGameState = true;
      this.statisticsObject = {};
      this.bgField = "";
      setTimeout(() => {
        this.isClearGameState = false;
      }, 0);
    },
    goToNextRound() {
      const options = { ...this.getSettingsFP };
      if (options.round[options.level] === options.roundsInLevelCount) {
        if (options.level === options.levelCount) {
          this.isEndGame = true;
          this.isShowFinalInfo = true;
          return false;
        }
        options.level += 1;
      } else {
        options.round[options.level] += 1;
      }
      this.setSettingsFP(options);
      this.startRound();
      return true;
    },
    closeEndGameInfo() {
      this.isShowFinalInfo = false;
    },
    endRound(result) {
      this.isEndRound = true;
      this.fillStatisticsObject(result);
      this.updateStatisticsFP();
      this.isShowResultsRound = true;
    },
    fillStatisticsObject(result) {
      this.cardsText.forEach((item) => {
        if (result.includes(item.id)) {
          this.statisticsObject.success.push(item);
        } else {
          this.statisticsObject.out.push(item);
        }
      });
    },
    updateStatisticsFP() {
      const statisticsItem = new StatisticsItem(
        this.getSettingsFP.level,
        this.getSettingsFP.round[this.getSettingsFP.level],
        this.statisticsObject.getWordsId()
      );
      const statisticsArray = [...this.getStatisticsFP];
      statisticsArray.push(statisticsItem);
      this.setStatisticsFP(statisticsArray);
      localStorage.setItem("findThePairStatistics", JSON.stringify(statisticsArray));
    },
    updateStatisticsFPFromLocaleStorage() {
      const statisticsArray = localStorage.getItem("findThePairStatistics");
      if (statisticsArray) this.setStatisticsFP(JSON.parse(statisticsArray));
    },
    setBgField() {
      this.fetchImagesUnsplash()
        .then(() => {
          this.bgField = this.getImagesUnsplash;
        })
        .catch(() => {
          this.bgField = "";
        });
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
.game-btn {
  @media (max-width: 600px) {
    font-size: 0.75rem !important;
    height: 28px !important;
    min-width: 50px !important;
    padding: 0 12.4444444444px !important;
  }
}
</style>
