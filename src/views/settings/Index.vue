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
        @change="changeState()"
        :step="stepSlider"
        :max="item.max"
        :min="item.min"
        hide-details
      >
        <template v-slot:append>
          <v-text-field
            v-model.number="learnSettings[item.field]"
            @input="changeState()"
            :step="stepSlider"
            :max="item.max"
            :min="item.min"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 60px;"
          ></v-text-field>
        </template>
      </v-slider>
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
    };
  },
  computed: {
    learnSettings() {
      return this.$store.state.userSettings.optional.learn;
    },

    settingsSliderArray() {
      return [
        {
          title: "Карточек для изучения в день",
          field: "wordsPerDay",
          min: settingsConstants.MIN_WORDS_PER_DAY,
          max: settingsConstants.MAX_WORDS_PER_DAY,
        },
        {
          title: "Новых слов в день",
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
