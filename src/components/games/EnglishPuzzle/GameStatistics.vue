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
        <v-toolbar-title>Статистика</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="pa-0">
        <v-container class="fill-height text-sm-body-2 text-md-body-1 text-lg-subtitle-1" fluid>
          <v-list two-line class="ml-auto mr-auto">
            <v-list-item v-if="!isStatistics">Статистика недоступна</v-list-item>
            <template v-else>
              <v-list-item v-for="(item, i) of getStatisticsEP" :key="i" class="pa-0">
                <v-chip color="primary" text-color="white" class="mr-4">{{ i + 1 }}</v-chip>
                <v-list-item-content>
                  <v-list-item-title class="wrap">
                    {{ statisticsLineTitle(item) }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="wrap">
                    <span class="red--text">"Я не знаю"</span>/
                    <span class="green--text">"Я знаю"</span>
                    :
                    <span class="red--text">{{ skipCount(item) }}</span>
                    /
                    <span class="green--text">{{ successCount(item) }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-btn
                    text
                    color="indigo"
                    class="hidden-sm-and-down"
                    @click="setValuesRoundStatistics(item.level, item.round, item.results)"
                  >
                    Подробнее
                  </v-btn>
                  <v-btn
                    icon
                    class="hidden-md-and-up"
                    @click="setValuesRoundStatistics(item.level, item.round, item.results)"
                  >
                    <v-icon large color="indigo">
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
    loading: false,
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
    ...mapActions(["fetchWordByIdEP", "setLoading"]),
    closeGameStatistics() {
      this.$emit("closeGameStatistics");
      this.isShowResultsRound = false;
    },
    statisticsLineTitle(item) {
      const date = new Date(item.date).toString().replace(/(.+) (GMT.+)/i, "$1");
      return `${date}, Уровень: ${item.level + 1}, Раунд: ${item.round + 1}`;
    },
    successCount(item) {
      return item.results.success.length;
    },
    skipCount(item) {
      return item.results.skip.length;
    },
    setValuesRoundStatistics(level, round, results) {
      const newPainting = new Painting(level, round);
      this.painting = newPainting.getPainting();
      this.setLoading(true);
      Promise.all(results.success.map((item) => this.fetchWordByIdEP(item)))
        .then((success) => {
          this.roundResults.success = success;
          Promise.all(results.skip.map((item) => this.fetchWordByIdEP(item)))
            .then((skip) => {
              this.roundResults.skip = skip;
              this.loading = false;
              this.isShowResultsRound = true;
            })
            .catch(() => {
              this.showAlert("error", "Error", "Word statistics not available");
              this.setLoading(false);
            });
        })
        .catch(() => {
          this.showAlert("error", "Error", "Word statistics not available");
          this.setLoading(false);
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
.wrap {
  white-space: initial;
}
</style>
