<template>
  <v-card>
    <v-card-text class="text-start">
      <p class="text-sm-h4 text-h5">
        Настройки для словарной тенировки
      </p>
    </v-card-text>

    <div
      v-for="item in settingsSliderArray"
      :key="item.id"
      class="d-flex flex-xs-nowrap flex-wrap justify-start align-center pa-5"
    >
      <v-slider
        class="align-center slider"
        v-model="learnSettings[item.field]"
        @change="changeNumberOfCards()"
        :step="stepSlider"
        :max="item.max"
        :min="item.min"
        :rules="sliderRules"
        hide-details="auto"
      >
      </v-slider>
      <p
        class="font-weight-bold text-subtitle-1 ml-2text--accent-4"
        v-text="learnSettings[item.field]"
      ></p>
      <p class="text-subtitle-1 ml-2">
        {{ item.title }}
      </p>
    </div>

    <v-card-title>Информация на карточках</v-card-title>
    <v-sheet v-for="(value, name) in toggles" :key="name" class="px-5">
      <v-switch
        v-model="value.state"
        @change="changeState()"
        inset
        :label="` ${value.title} ${value.state ? 'вкл.' : 'выкл.'}`"
      ></v-switch>
    </v-sheet>
  </v-card>
</template>

<script>
import settingsConstants from "@/config/settingsConstants";

export default {
  data() {
    return {
      stepSlider: settingsConstants.STEP_SLIDER_CARDS,
      sliderRules: [
        () =>
          this.learnSettings.newWordsPerDay <= this.learnSettings.wordsPerDay ||
          "Новых слов не может быть больше общего колличесва",
      ],
    };
  },
  computed: {
    learnSettings() {
      return this.$store.state.userSettings.optional.learn;
    },

    settingsSliderArray() {
      return [
        {
          title: "карточек для изучения в день",
          field: "wordsPerDay",
          min: settingsConstants.MIN_WORDS_PER_DAY,
          max: settingsConstants.MAX_WORDS_PER_DAY,
        },
        {
          title: "новых слов в день",
          field: "newWordsPerDay",
          min: settingsConstants.MIN_NEW_WORDS_PER_DAY,
          max: settingsConstants.MAX_NEW_WORDS_PER_DAY,
        },
      ];
    },

    toggles() {
      return this.learnSettings.toggles;
    },
  },
  methods: {
    changeState() {
      this.$store.commit("setGameSetting", { gameName: "learn", gameSettings: this.learnSettings });
      setTimeout(() => {
        this.uploadSettingsToBack();
      }, 1500);
    },
    changeNumberOfCards() {
      if (this.learnSettings.newWordsPerDay > this.learnSettings.wordsPerDay) {
        this.learnSettings.newWordsPerDay = this.learnSettings.wordsPerDay;
      }
      this.changeState();
    },
    uploadSettingsToBack() {
      console.log("uploadSettingsToBack");

      this.$store.dispatch("uploadSettings");
    },
  },
};
</script>

<style scoped>
.slider {
  max-width: 280px;
  min-width: 280px;
}
</style>
