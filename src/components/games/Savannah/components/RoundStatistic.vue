<template>
  <v-dialog class="roundStatistic" v-model="roundModalActive" persistent max-width="100vw">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="$emit('closeModal')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Правильных</th>
              <th class="text-left">Ошибок</th>
              <th class="text-left">Результат</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ statistic.correct }}</td>
              <td>{{ statistic.wrong }}</td>

              <td>{{ statistic.correct }} / {{ statistic.correct + statistic.wrong }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-actions>
        <v-btn @click="$emit('atStart')" color="blue" text>В начало</v-btn>
        <v-btn @click="$emit('next')" color="blue" text>Следующий</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["roundModalActive", "statistic"],
};
</script>

<style></style>
