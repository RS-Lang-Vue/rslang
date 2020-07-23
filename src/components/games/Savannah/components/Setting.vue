<template>
  <div>
    <v-icon @click="settingsActive = true" color="white" large class="icon">mdi-cogs</v-icon>
    <v-dialog v-model="settingsActive" max-width="500">
      <v-card>
        <v-card-title class="headline">Какие слова использовать?</v-card-title>

        <div>
          <v-radio-group v-model="radio" class="radio-word">
            <v-radio :label="'Изученные'" @change="changeWord(false)" :value="false"></v-radio>
            <v-radio :label="'Новые'" @change="changeWord(true)" :value="true"></v-radio>
          </v-radio-group>
          <form>
            <v-slider
              :disabled="formDisabled"
              class="slider"
              max="29"
              v-model="round"
              thumb-label
              @change="changeRound"
            ></v-slider>
            <p>Уровень</p>
            <v-slider
              :disabled="formDisabled"
              class="slider"
              max="5"
              v-model="level"
              thumb-label
              @change="changeLevel"
            ></v-slider>
            <p>Сложность</p>
          </form>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: mapGetters(["getSavannahSettings"]),
  data() {
    return {
      radio: false,
      settingsActive: false,
      round: 0,
      level: 0,
      formDisabled: true,
      settings: "",
    };
  },
  async mounted() {
    await this.getSettings();
  },
  methods: {
    ...mapActions(["downloadSettings", "uploadSettings", "setLoading", "setGameSetting"]),
    async getSettings() {
      await this.downloadSettings();
      this.settings = this.getSavannahSettings;
      this.radio = this.settings.newWords;
      this.formDisabled = !this.settings.newWords;
    },
    changeRound() {
      this.settings.round[this.level] = this.round;
      this.setGameSetting({ gameName: "gameSavannah", gameSettings: this.settings });
    },
    changeLevel() {
      this.settings.level = this.level;
      this.setGameSetting({ gameName: "gameSavannah", gameSettings: this.settings });
    },
    changeWord(x) {
      this.radio = x;
      this.formDisabled = !x;
      this.settings.newWords = x;
      this.setGameSetting({ gameName: "gameSavannah", gameSettings: this.settings });
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  padding: 5px;
  border-radius: 8px;
  background: #ffffff44;
  &:hover {
    transform: scale(1.1);
  }
}
.slider {
  width: 80%;
}
.radio-word {
  padding-left: 20px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
