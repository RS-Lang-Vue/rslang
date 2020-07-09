<template>
  <v-dialog
    v-model="statisticVisible"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-icon v-on="on" color="white" large class="icon statistic-btn">mdi-equalizer</v-icon>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="statisticVisible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Статистика</v-toolbar-title>
      </v-toolbar>
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Дата</th>
              <th class="text-left">Правильных</th>
              <th class="text-left">Ошибок</th>
              <th class="text-left">Результат</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in getSavannahStatistic" :key="item.id">
              <td>{{ item.date }}</td>
              <td>{{ item.correct }}</td>
              <td>{{ item.wrong }}</td>
              <td>{{ item.correct }} / {{ item.correct + item.wrong }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      statisticVisible: false,
    };
  },
  computed: mapGetters(["getSavannahStatistic"]),
};
</script>

<style lang="scss" scoped>
.icon {
  padding: 5px;
  margin-right: 20px;

  border-radius: 8px;
  background: #ffffff44;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
