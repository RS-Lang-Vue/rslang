<template>
  <v-card>
    <v-card-text class="text-start">
      <!-- <div>Word of the Day</div> -->
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
        v-model="item.value"
        :step="stepSlider"
        :max="item.max"
        :min="item.min"
        hide-details
      >
        <template v-slot:append>
          <v-text-field
            v-model="item.value"
            step="5"
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
    <v-sheet v-for="item in settingsSwitchArray" :key="item.title" class="px-5">
      <v-switch
        v-model="item.state"
        inset
        :label="` ${item.title} ${item.state ? 'вкл.' : 'выкл.'}`"
      ></v-switch>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      stepSlider: 10,
      settingsSliderArray: [
        {
          title: "Карточек для изучения в день",
          value: 50,
          min: 10,
          max: 100,
        },
        {
          title: "Новых слов в день",
          value: 40,
          min: 10,
          max: 90,
        },
      ],

      settingsSwitchArray: [
        {
          title: "Перевод слова",
          state: false,
        },
        {
          title: "Объяснение значения",
          state: false,
        },
        {
          title: "Пример использования",
          state: false,
        },
        {
          title: "Транскрипция",
          state: false,
        },
        {
          title: "Картинка-ассоциация",
          state: false,
        },
        {
          title: "Автоматическое произношение",
          state: false,
        },
        {
          title: "Перевод после ответа ",
          state: false,
        },
        {
          title: 'Кнопка "Ответ"',
          state: false,
        },
        {
          title: 'Кнопка "Удалить"',
          state: false,
        },
        {
          title: 'Кнопка "Сложное"',
          state: false,
        },
      ],
    };
  },
  components: {},
};
</script>

<style scoped>
.slider {
  max-width: 280px;
  min-width: 280px;
}
</style>
