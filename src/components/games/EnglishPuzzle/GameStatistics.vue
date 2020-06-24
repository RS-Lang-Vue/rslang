<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card justify="center">
      <v-toolbar dark color="indigo" max-height="64">
        <v-btn icon dark @click="closeGameStatistics">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Statistics</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="pa-0">
        <v-container class="fill-height text-sm-body-2 text-md-body-1 text-lg-subtitle-1" fluid>
          <v-list two-line class="ml-auto mr-auto">
            <v-list-item v-if="!isStatistics">Statistics are not available</v-list-item>
            <template v-else>
              <v-list-item v-for="(item, i) of getStatisticsEP" :key="i" class="pa-0">
                <v-chip color="primary" text-color="white" class="mr-4">{{ i + 1 }}</v-chip>
                <v-list-item-content>
                  <v-list-item-title class="wrap">
                    {{ statisticsLineTitle(item) }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="wrap">
                    <span class="red--text">"I don't know"</span>/
                    <span class="green--text">"I know"</span>
                    :
                    <span class="red--text">{{ skipCount(item) }}</span>
                    /
                    <span class="green--text">{{ successCount(item) }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-btn icon>
                    <v-icon
                      large
                      color="indigo"
                      @click="setValuesRoundStatistics(item.level, item.round, item.results)"
                    >
                      mdi-more
                    </v-icon>
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
            </template>
          </v-list>
          <RoundStatistics
            :painting="painting"
            :isShowResultsRound="isShowResultsRound"
            :isGameStatisticsOpen="isGameStatisticsOpen"
            :roundResults="roundResults"
            v-on:closeRoundStatistics="isShowResultsRound = false"
          />
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RoundStatistics from "@/components/games/EnglishPuzzle/RoundStatistics.vue";
import Painting from "@/helpers/english-puzzle/paintings";

export default {
  components: {
    RoundStatistics,
  },
  props: {
    isShowGameStatistics: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    isShowResultsRound: false,
    roundResults: {},
    painting: {},
    isGameStatisticsOpen: true,
  }),
  computed: {
    ...mapGetters(["getWord", "getStatisticsEP"]),
    dialog: {
      get() {
        return this.isShowGameStatistics;
      },
      set() {
        this.closeGameStatistics();
      },
    },
    isStatistics() {
      return !!this.getStatisticsEP.length;
    },
  },
  methods: {
    ...mapActions(["fetchWordByIdEP"]),
    closeGameStatistics() {
      this.$emit("closeGameStatistics");
      this.isShowResultsRound = false;
    },
    statisticsLineTitle(item) {
      const date = new Date(item.date).toString().replace(/(.+) (GMT.+)/i, "$1");
      return `${date}, Level: ${item.level}, Round: ${item.round}`;
    },
    successCount(item) {
      return item.results.success.length;
    },
    skipCount(item) {
      return item.results.skip.length;
    },
    async setValuesRoundStatistics(level, round, results) {
      const newPainting = new Painting(level, round);
      this.painting = newPainting.getPainting();
      const success = await Promise.all(results.success.map((item) => this.fetchWordByIdEP(item)));
      this.roundResults.success = success;
      const skip = await Promise.all(results.skip.map((item) => this.fetchWordByIdEP(item)));
      this.roundResults.skip = skip;
      this.isShowResultsRound = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  white-space: initial;
}
</style>