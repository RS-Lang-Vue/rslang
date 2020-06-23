<template>
  <div class="home grey lighten-1">
    <v-container>
      <!-- Stack the columns on mobile by making one full-width and the other half-width -->
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-card-title class="headline">Сегодня</v-card-title>
            <v-simple-table dense light>
              <tbody>
                <tr>
                  <td class="text-left">Слова для практики</td>
                  <td class="text-right">11</td>
                </tr>
                <tr>
                  <td class="text-left">Лучшая серия</td>
                  <td class="text-right">0</td>
                </tr>
                <tr>
                  <td class="text-left">Пройдено слов по практике</td>
                  <td class="text-right">11</td>
                </tr>
                <tr>
                  <td class="text-left">Правильные повторы, %</td>
                  <td class="text-right">0</td>
                </tr>
                <tr>
                  <td class="text-left">Новые слова</td>
                  <td class="text-right">0</td>
                </tr>
              </tbody>
            </v-simple-table>

            <v-card-actions>
              <v-btn text color="indigo accent-4">Продолжить обучение</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="pa-2" outlined tile>
            .col-6 .col-md-4
          </v-card>
        </v-col>
      </v-row>

      <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
      <v-row>
        <v-col v-for="n in 3" :key="n" cols="6" md="4">
          <v-card class="pa-2" outlined tile>
            .col-6 .col-md-4
          </v-card>
        </v-col>
      </v-row>

      <!-- Columns are always 50% wide, on mobile and desktop -->
      <v-row>
        <v-col v-for="n in 2" :key="n" cols="6">
          <v-card class="pa-2" outlined tile>
            .col-6
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.home {
  /* background-color: #e0e0e0; */
}
</style>
