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
    <Settings
      :isShowSettings="isShowSettings"
      v-on:closeSettings="isShowSettings = false"
      v-on:changeLearned="changeLearned"
    />
    <v-card
      class="game-content text-center"
      dark
      flat
      color="transparent"
      max-width="800"
      min-width="290"
    >
      <v-card class="pt-5" color="transparent" flat>
        <circular-count-down-timer
          :key="timer.timerKey"
          :initial-value="timer.time"
          :steps="timer.time + 0.01"
          :size="120"
          :show-negatives="false"
          :second-label="''"
          :paused="timer.pause"
          @finish="timer.finished = true"
          ref="timer"
        ></circular-count-down-timer>
      </v-card>
      <PlayField
        :cardsArray="cardsArray"
        :isClearGameState="isClearGameState"
        :bgField="bgField"
        :isTimeOver="timer.finished"
        :isInit="isInit"
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
      <NotEnoughWordsMessage
        :isEnoughWords="isShowMessageNotEnoughWords"
        v-on:closeMessage="isShowMessageNotEnoughWords = false"
      />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="isHelpButtonAccessibility"
          color="primary"
          @click="skipRound"
          :disabled="loading"
        >
          Сдаться
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
        <v-btn color="primary" @click="startGame(false)" class="game-btn" :disabled="loading">
          <span v-if="isInit">Старт</span>
          <v-icon v-else>mdi-refresh</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import PlayField from "@/components/games/FindThePair/PlayField/PlayField.vue";
import Settings from "@/components/games/FindThePair/Settings.vue";
import RoundStatistics from "@/components/games/FindThePair/RoundStatistics.vue";
import GameStatistics from "@/components/games/FindThePair/GameStatistics.vue";
import EndGameInfo from "@/components/games/FindThePair/EndGameInfo.vue";
import NotEnoughWordsMessage from "@/components/games/FindThePair/NotEnoughWordsMessage.vue";
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
    NotEnoughWordsMessage,
  },
  data() {
    return {
      GAME_TIME: [240, 180, 120],
      cardsArray: [],
      cardsText: [],
      isInit: true,
      isShowSettings: false,
      isEndRound: false,
      isEndGame: false,
      isShowFinalInfo: false,
      isClearGameState: false,
      isShowResultsRound: false,
      isShowGameStatistics: false,
      isShowMessageNotEnoughWords: false,
      isGameFieldUpdated: false,
      statisticsObject: {},
      bgField: "",
      timer: {
        time: 0,
        pause: false,
        finished: false,
        timerKey: 0,
      },
    };
  },
  computed: {
    ...mapGetters([
      "getWordsForRoundFP",
      "getSettingsFP",
      "getIsUserChangedRoundFP",
      "getStatisticsFP",
      "getImagesUnsplash",
      "loading",
    ]),
    isСontinueButtonAccessibility() {
      return this.isEndRound && !this.isEndGame;
    },
    isHelpButtonAccessibility() {
      return !this.isEndRound && !this.isInit && !this.isEndGame;
    },
  },
  watch: {
    getIsUserChangedRoundFP() {
      if (this.getIsUserChangedRoundFP) {
        this.setRoundData();
        this.isInit = true;
      }
    },
  },
  async mounted() {
    await this.downloadSettingsFP();
    this.updateStatisticsFPFromLocaleStorage();
    this.setRoundData();
  },
  methods: {
    ...mapActions([
      "fetchWordsForRoundFP",
      "setSettingsFP",
      "setIsUserChangedRoundFP",
      "downloadSettingsFP",
      "setStatisticsFP",
      "fetchImagesUnsplash",
      "getLearnedWordsSortByRepeatDate",
      "setLoading",
      "setError",
    ]),
    ...mapMutations(["updateWordsForRoundFP"]),
    async startGame(setData) {
      if (setData) {
        await this.setRoundData();
      } else if (!this.isGameFieldUpdated) {
        this.clearGameState();
        this.placeСards();
      }
      this.setTimer();
      this.isInit = false;
    },
    async setRoundData() {
      this.clearGameState();
      if (this.getSettingsFP.learned) {
        this.setLoading(true);
        const words = await this.getLearnedWordsSortByRepeatDate({ count: 10 });
        if (!words.success) {
          this.setError(words.error);
          this.updateOptions("learned", false);
        } else {
          this.updateWordsForRoundFP(words.result);
          this.placeСards();
        }
        this.setLoading(false);
      } else {
        this.fetchWordsForRoundFP(this.getSettingsFP).then(() => {
          this.placeСards();
          this.setIsUserChangedRoundFP(false);
        });
      }
      setTimeout(() => {
        this.setBgField();
      }, 50);
    },
    placeСards() {
      const words = this.getWordsForRoundFP;
      const cardsImages = [];
      words.forEach((item) => {
        cardsImages.push(new Card(item, true));
        this.cardsText.push(new Card(item));
      });
      this.cardsArray = [...cardsImages, ...this.cardsText].sort(() => Math.random() - 0.5);
      this.isGameFieldUpdated = true;
    },
    clearGameState() {
      this.cardsText = [];
      this.cardsArray = [];
      this.isEndRound = false;
      this.isEndGame = false;
      this.isClearGameState = true;
      this.isGameFieldUpdated = false;
      this.statisticsObject = new StatisticsObject();
      this.bgField = "";
      this.resetTimer();
      setTimeout(() => {
        this.isClearGameState = false;
      }, 0);
    },
    async goToNextRound() {
      if (!this.getSettingsFP.learned) {
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
      }
      this.startGame(true);
      return true;
    },
    closeEndGameInfo() {
      this.isShowFinalInfo = false;
    },
    skipRound() {
      this.timer.finished = true;
    },
    endRound(result) {
      this.timer.pause = true;
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
      this.statisticsObject.time -= this.$refs.timer.value;
    },
    updateStatisticsFP() {
      const lvl = this.getSettingsFP.learned ? "-" : this.getSettingsFP.level;
      const rnd = this.getSettingsFP.learned
        ? "-"
        : this.getSettingsFP.round[this.getSettingsFP.level];
      const statisticsItem = new StatisticsItem(lvl, rnd, this.statisticsObject.getWordsId());
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
    setTimer() {
      this.timer.pause = false;
      this.timer.finished = false;
      this.timer.time = this.GAME_TIME[this.getSettingsFP.complexity];
      this.statisticsObject.time = this.timer.time;
      this.timer.timerKey += 1;
      this.isGameFieldUpdated = false;
    },
    resetTimer() {
      this.timer.pause = false;
      this.timer.finished = false;
      this.timer.time = 0;
      this.timer.timerKey += 1;
    },
    updateOptions(option, value) {
      const options = { ...this.getSettingsFP };
      options[option] = value;
      this.setSettingsFP(options);
    },
    changeLearned(value) {
      if (value) {
        this.setRepeatMode();
      } else {
        this.updateOptions("learned", false);
        this.setRoundData();
        this.isInit = true;
      }
    },
    async setRepeatMode() {
      this.setLoading(true);
      const words = await this.getLearnedWordsSortByRepeatDate({ count: 10 });
      if (!words.success) {
        this.setError(words.error);
        this.updateOptions("learned", true);
        setTimeout(() => {
          this.updateOptions("learned", false);
        }, 0);
      } else if (words.result.length < 10) {
        this.isShowMessageNotEnoughWords = true;
        this.updateOptions("learned", true);
        setTimeout(() => {
          this.updateOptions("learned", false);
        }, 0);
      } else {
        this.updateOptions("learned", true);
        this.clearGameState();
        this.updateWordsForRoundFP(words.result);
        this.isInit = true;
        this.placeСards();
        setTimeout(() => {
          this.setBgField();
        }, 100);
      }
      this.setLoading(false);
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
