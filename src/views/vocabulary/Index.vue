<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      class="elevation-2"
      dark
      :centered="true"
      :grow="true"
      :vertical="false"
      :right="false"
      :prev-icon="undefined"
      :next-icon="undefined"
      :icons-and-text="icons"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">
        {{ tabNames[i] }}
        <v-icon v-if="icons">mdi-phone</v-icon>
      </v-tab>

      <v-tab-item v-for="i in tabs" :key="i" :value="'tab-' + i">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">Слово</th>
                <th class="text-center">Транскрипция</th>
                <th class="text-center">Перевод</th>
                <th class="text-center">Повторялось</th>
                <th class="text-center">Дата последнего повторения</th>
                <th class="text-center">Дата планируемого повторения</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in words" :key="item.name">
                <td>{{ item.word }}</td>
                <td>{{ item.transcription }}</td>
                <td>{{ item.wordTranslate }}</td>
                <td>{{ item.userWord.optional.repeatCount }}</td>
                <td>
                  {{ new Date(item.userWord.optional.lastDate).toLocaleString("ru-Ru") }}
                </td>
                <td>
                  {{ new Date(item.userWord.optional.repeatDate).toLocaleString("ru-Ru") }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-tab-item>
    </v-tabs>
    Vocabulary page
    {{ cuirrentDifficulty }}
    {{ cuirrentDifficultyCopy }}
    <input v-model="cuirrentDifficulty" />
  </div>
</template>

<script>
export default {
  data: () => ({
    tabNames: ["Изучаемые слова", "Сложные слова", "Удалённые слова"],
    tab: null,
    icons: false,
    tabs: [0, 1, 2],
    cuirrentDifficulty: 0,
    words: [],
  }),
  async mounted() {
    await this.getWords();
  },
  computed: {
    cuirrentDifficultyCopy() {
      return this.cuirrentDifficulty + 1;
    },
  },
  methods: {
    async getWords() {
      const res = await this.$store.dispatch("getUserAggregateWords", {
        page: 0,
        wordsPerPage: 20,
        difficulty: 0,
      });
      if (!res.success) {
        alert(res.error);
      }
      this.words = res.result;
    },
  },
};
</script>

<style></style>
