<template>
  <div class="control-bar">
    <v-dialog
      v-model="statisticVisible"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" @click="visible()" color="white" large class="icon statistic-btn"
          >mdi-equalizer</v-icon
        >
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
                <th class="text-left">Лучший стрик</th>
                <th class="text-left">Результат</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in statistic" :key="item.id">
                <td>{{ item.date }}</td>
                <td>{{ item.correct }}</td>
                <td>{{ item.wrong }}</td>
                <td>{{ item.streak }}</td>
                <td>{{ item.correct }} / {{ item.correct + item.wrong }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-dialog>

    <v-icon @click="settings = true" color="white" large class="icon">mdi-cogs</v-icon>
    <v-dialog v-model="settings" max-width="500">
      <v-card>
        <v-card-title class="headline">Какие слова использовать?</v-card-title>

        <div>
          <v-radio-group v-model="radio" class="radio-word">
            <v-radio :label="'Изученные'" @change="changeWord(true)" :value="true"></v-radio>
            <v-radio :label="'Новые'" @change="changeWord(false)" :value="false"></v-radio>
          </v-radio-group>
          <form>
            <v-slider
              :disabled="formDisabled"
              class="slider"
              max="19"
              v-model="localRound"
              thumb-label
              @change="changeRound()"
            ></v-slider>
            <p>Уровень</p>
            <v-slider
              :disabled="formDisabled"
              class="slider"
              max="5"
              v-model="localLevel"
              thumb-label
              @change="changeLevel()"
            ></v-slider>
            <p>Сложность</p>
          </form>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["round", "level", "words"],
  data() {
    return {
      radio: this.words,
      localRound: this.round,
      localLevel: this.level,
      statisticVisible: false,
      settings: false,
      formDisabled: this.words,
      statistic: JSON.parse(localStorage.getItem("SprintStatistic")) || [],
    };
  },
  methods: {
    changeWord(x) {
      this.$emit("changeWord", x);
      this.formDisabled = x;
      const transit = JSON.parse(localStorage.getItem("SprintSettings")) || {
        words: false,
        round: 0,
        level: 0,
      };
      transit.words = x;
      localStorage.setItem("SprintSettings", JSON.stringify(transit));
    },
    changeRound() {
      this.$emit("changeRound", this.localRound);
      const transit = JSON.parse(localStorage.getItem("SprintSettings")) || {
        words: false,
        round: 0,
        level: 0,
      };
      transit.round = this.localRound;
      localStorage.setItem("SprintSettings", JSON.stringify(transit));
    },
    changeLevel() {
      this.$emit("changeLevel", this.localLevel);
      const transit = JSON.parse(localStorage.getItem("SprintSettings")) || {
        words: false,
        round: 0,
        level: 0,
      };
      transit.level = this.localLevel;
      localStorage.setItem("SprintSettings", JSON.stringify(transit));
    },
    visible() {
      this.statistic = JSON.parse(localStorage.getItem("SprintStatistic")) || [];
      this.statisticVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.control-bar {
  width: 8vw;
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 75px;
  right: 30px;
  z-index: 10;

  .statistic-btn {
    margin-right: 10px;
  }
}
.icon {
  padding: 2px;
  border: 2px solid #ffffff;
  border-radius: 8px;
  &:hover {
    transform: scale(1.1);
  }
}
.radio-word {
  padding-left: 20px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.slider {
  width: 80%;
}

@media screen and (max-height: 850px) {
  .control-bar {
    top: initial;
    bottom: 38px;
    right: initial;
    width: 100%;
  }
  .icon {
    font-size: 30px !important;
    border: none;
  }
}
</style>
