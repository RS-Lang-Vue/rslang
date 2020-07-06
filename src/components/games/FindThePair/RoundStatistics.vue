<template>
  <v-dialog v-model="dialogControl" scrollable max-width="400">
    <v-card justify="center">
      <v-card-title>Результат раунда</v-card-title>
      <v-card-subtitle class="pb-1"
        ><span class="green--text">Открытые: {{ arraySuccessLength() }}</span> /
        <span class="red--text">Не открытые: {{ arrayOutLength() }}</span>
        <div>Пройден за: {{ statisticsObject.time }} сек.</div>
      </v-card-subtitle>
      <v-card-text style="max-height: 500px;" class="px-1 px-sm-6">
        <v-list two-line subheader>
          <v-subheader inset>
            <span class="mr-2">Открытые</span>
            <v-chip color="green" text-color="white" small>
              {{ arraySuccessLength() }}
            </v-chip>
          </v-subheader>
          <v-list-item v-for="(card, i) of statisticsObject.success" :key="i" class="pa-0">
            <v-list-item-icon class="mr-4">
              <v-btn icon @click="audio.play(card.audio)" :disabled="audio.isAudioActive">
                <v-icon large color="indigo" v-if="audio.isAudioActive">mdi-volume-high</v-icon>
                <v-icon large color="indigo" v-else>mdi-volume-low</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="wrap">
                {{ card.word }}
              </v-list-item-title>
              <v-list-item-subtitle class="wrap">
                {{ card.wordTranslate }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar rounded="0" height="50px" width="75px">
              <v-img :src="card.image"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
        <v-divider inset></v-divider>
        <v-list two-line subheader>
          <v-subheader inset>
            <span class="mr-2">Не открытые</span>
            <v-chip color="red" text-color="white" small>{{ arrayOutLength() }}</v-chip>
          </v-subheader>
          <v-list-item v-for="(card, i) of statisticsObject.out" :key="i">
            <v-list-item-icon class="mr-4">
              <v-btn icon @click="audio.play(card.audioExample)" :disabled="audio.isAudioActive">
                <v-icon large color="indigo" v-if="audio.isAudioActive">mdi-volume-high</v-icon>
                <v-icon large color="indigo" v-else>mdi-volume-low</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="wrap">
                {{ card.word }}
              </v-list-item-title>
              <v-list-item-subtitle class="wrap">
                {{ card.wordTranslate }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar rounded="0" height="50px" width="75px">
              <v-img :src="card.image"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider inset></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="continueGame"
          v-if="!isGameStatisticsOpen"
          class="game-btn"
          >Продолжить</v-btn
        >
        <v-btn color="primary" text @click="closeRoundStatistics" class="game-btn">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AudioControl from "@/helpers/audio-control";

export default {
  props: {
    isGameStatisticsOpen: {
      type: Boolean,
    },
    isShowResultsRound: {
      type: Boolean,
      required: true,
    },
    statisticsObject: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    audio: {},
  }),
  computed: {
    dialogControl: {
      get() {
        return this.isShowResultsRound;
      },
      set() {
        this.closeRoundStatistics();
      },
    },
  },
  mounted() {
    this.audio = new AudioControl();
  },
  methods: {
    closeRoundStatistics() {
      this.$emit("closeRoundStatistics");
    },
    continueGame() {
      this.closeRoundStatistics();
      this.$emit("continueGame");
    },
    openGameStatistics() {
      this.$emit("openGameStatistics");
    },
    arrayOutLength() {
      if (this.statisticsObject.out) return this.statisticsObject.out.length;
      return false;
    },
    arraySuccessLength() {
      if (this.statisticsObject.success) return this.statisticsObject.success.length;
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  white-space: initial;
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
