<template>
  <v-card>
    <v-card-text class="text-start">
      <!-- <div>Word of the Day</div> -->
      <p class="text-sm-h4 text-h5">
        Настройка словарной тенировки
      </p>
    </v-card-text>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row
            :align="alignment"
            :justify="justify"
            class="grey lighten-5"
            style="height: 300px;"
          >
            <v-card v-for="n in 3" :key="n" class="ma-3 pa-6" outlined tile>
              Column
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row justify="center">
            <v-col cols="6" md="2">
              <v-select v-model="alignment" :items="alignmentsAvailable" label="Align"></v-select>
            </v-col>

            <v-col cols="6" md="2">
              <v-select v-model="justify" :items="justifyAvailable" label="Justify"></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-card-text>
      <v-row>
        <v-col class="pr-4 d-flex flex-no-wrap justify-space-between align-center">
          <span class="text-subtitle-1">
            Новых карточек в день
          </span>
        </v-col>
        <v-col class="pr-4">
          <v-slider v-model="slider" class="align-center" :max="max" :min="min" hide-details>
            <template v-slot:append>
              <v-text-field
                v-model="slider"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px;"
              ></v-text-field>
            </template>
          </v-slider>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-title>Информация на карточках</v-card-title>
    <v-sheet class="pa-5 pt-0">
      <v-switch v-model="switch1" inset :label="`Switch 1: ${switch1.toString()}`"></v-switch>
      <v-switch v-model="switch2" inset :label="`Switch 2: ${switch2.toString()}`"></v-switch>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      switch1: true,
      switch2: false,
      min: -50,
      max: 90,
      slider: 40,
      range: [-20, 70],

      alignmentsAvailable: ["start", "center", "end", "baseline", "stretch"],
      alignment: "center",
      dense: false,
      justifyAvailable: ["start", "center", "end", "space-around", "space-between"],
      justify: "center",
    };
  },
  components: {},
};
</script>
