<template>
  <v-dialog v-model="dialogControl" scrollable max-width="500">
    <v-card justify="center">
      <v-img
        :src="painting.cutSrc"
        max-height="281"
        lazy-src="../../../assets/images/placeholder.png"
      ></v-img>
      <v-card-title class="painting-title pt-0">{{ painting.author }}</v-card-title>
      <v-card-subtitle class="pb-0 mb-5 text-center">
        {{ painting.name }}, {{ painting.year }}
      </v-card-subtitle>
      <v-divider inset></v-divider>
      <v-card-text style="height: 300px;">
        <v-list two-line subheader>
          <v-subheader inset>
            <span class="mr-2">Я не знаю</span>
            <v-chip color="red" text-color="white" small>{{ arraySkipLength() }}</v-chip>
          </v-subheader>
          <v-list-item v-for="(round, i) of roundResults.skip" :key="i">
            <v-list-item-icon class="mr-4">
              <v-btn icon @click="audio.play(round.audioExample)" :disabled="audio.isAudioActive">
                <v-icon large color="indigo" v-if="audio.isAudioActive">mdi-volume-high</v-icon>
                <v-icon large color="indigo" v-else>mdi-volume-low</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="wrap">
                {{ round.textExample | removeTags }}
              </v-list-item-title>
              <v-list-item-subtitle class="wrap">
                {{ round.textExampleTranslate }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider inset></v-divider>
        <v-list two-line subheader>
          <v-subheader inset>
            <span class="mr-2">Я знаю</span>
            <v-chip color="green" text-color="white" small>
              {{ arraySuccessLength() }}
            </v-chip>
          </v-subheader>
          <v-list-item v-for="(round, i) of roundResults.success" :key="i">
            <v-list-item-icon class="mr-4">
              <v-btn icon @click="audio.play(round.audioExample)" :disabled="audio.isAudioActive">
                <v-icon large color="indigo" v-if="audio.isAudioActive">mdi-volume-high</v-icon>
                <v-icon large color="indigo" v-else>mdi-volume-low</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="wrap">
                {{ round.textExample | removeTags }}
              </v-list-item-title>
              <v-list-item-subtitle class="wrap">
                {{ round.textExampleTranslate }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider inset></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          class="game-btn"
          text
          @click="closeRoundStatistics"
          v-if="isGameStatisticsOpen"
        >
          Закрыть</v-btn
        >
        <template v-else>
          <v-btn color="primary" class="game-btn" text @click="continueGame">Продолжить</v-btn>
          <v-btn color="primary" class="game-btn" text @click="openGameStatistics"
            >Статистика</v-btn
          >
        </template>
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
    painting: {
      type: Object,
      required: true,
    },
    roundResults: {
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
  filters: {
    removeTags(value) {
      return value
        .split(" ")
        .map((item) => item.replace(/<\/?[^>]+>/g, ""))
        .join(" ");
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
    arraySkipLength() {
      if (this.roundResults.skip) return this.roundResults.skip.length;
      return false;
    },
    arraySuccessLength() {
      if (this.roundResults.success) return this.roundResults.success.length;
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.painting-title {
  justify-content: center;
  word-break: normal;
}
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
