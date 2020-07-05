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
              <v-list-item v-for="(item, i) of getStatisticsFP" :key="i" class="pa-0">
                <v-chip color="primary" text-color="white" class="mr-4">{{ i + 1 }}</v-chip>
                <v-list-item-content>
                  <v-list-item-title class="wrap">
                    {{ statisticsLineTitle(item) }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="wrap">
                    <span class="green--text">"Открытые"</span>
                    :
                    <span class="green--text">{{ successCount(item) }}</span>
                    /
                    <span class="red--text">"Не открытые"</span>
                    :
                    <span class="red--text">{{ outCount(item) }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-btn
                    text
                    color="indigo"
                    class="hidden-sm-and-down"
                    @click="setValuesRoundStatistics(item.results)"
                  >
                    Подробнее
                  </v-btn>
                  <v-btn
                    icon
                    class="hidden-md-and-up"
                    @click="setValuesRoundStatistics(item.results)"
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
            :isShowResultsRound="isShowResultsRound"
            :isGameStatisticsOpen="isGameStatisticsOpen"
            :statisticsObject="roundResults"
            v-on:closeRoundStatistics="isShowResultsRound = false"
          />
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RoundStatistics from "@/components/games/FindThePair/RoundStatistics.vue";
import getFullImageUrl from "@/helpers/find-the-pair/image";

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
    isGameStatisticsOpen: true,
    loading: false,
  }),
  computed: {
    ...mapGetters(["getStatisticsFP"]),
    dialog: {
      get() {
        return this.isShowGameStatistics;
      },
      set() {
        this.closeGameStatistics();
      },
    },
    isStatistics() {
      return !!this.getStatisticsFP.length;
    },
  },
  methods: {
    ...mapActions(["fetchWordByIdFP", "setLoading"]),
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
    outCount(item) {
      return item.results.out.length;
    },
    setValuesRoundStatistics(results) {
      this.setLoading(true);
      Promise.all(results.success.map((item) => this.fetchWordByIdFP(item)))
        .then((success) => {
          success.forEach((el) => {
            const item = el;
            const fullUrlImage = getFullImageUrl(item.image);
            item.image = fullUrlImage;
          });
          this.roundResults.success = success;
          Promise.all(results.out.map((item) => this.fetchWordByIdFP(item)))
            .then((out) => {
              out.forEach((el) => {
                const item = el;
                const fullUrlImage = getFullImageUrl(item.image);
                item.image = fullUrlImage;
              });
              this.roundResults.out = out;
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
