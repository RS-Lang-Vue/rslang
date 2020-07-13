<template>
  <div>
    <div v-if="loading">
      <v-data-table
        item-key="name"
        class="elevation-1"
        loading
        loading-text="Загружается... Пожалуйста, подождите."
      ></v-data-table>
    </div>
    <div v-else>
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
        <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">
          {{ tabNames[i] }}
        </v-tab>

        <v-tab-item v-for="i in tabs" :key="i" :value="'tab-' + i">
          <v-data-table :headers="headers" :items="words" hide-default-footer class="elevation-1">
            <template v-slot:item="row">
              <tr>
                <td>{{ row.item.word }}</td>
                <td>
                  <v-btn icon small @click="audio.play(row.item.audio)">
                    <v-icon dark>mdi-volume-high</v-icon>
                  </v-btn>
                  {{ row.item.transcription }}
                </td>
                <td>{{ row.item.wordTranslate }}</td>
                <td>{{ row.item.repeatCount }}</td>
                <td>{{ row.item.lastDate }}</td>
                <td>{{ row.item.repeatDate }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs>
    </div>
    <div class="text-center">
      <v-pagination v-model="page" :length="pageCount" :total-visible="7"></v-pagination>
    </div>
  </div>
</template>

<script>
import AudioControl from "@/helpers/audio-control";

export default {
  data: () => ({
    page: 1,
    pageCount: 1,
    tabNames: ["Изучаемые слова", "Сложные слова", "Удалённые слова"],
    headers: [
      {
        text: "Слово",
        align: "start",
        sortable: false,
        value: "word",
      },
      {
        text: "Произношение",
        align: "start",
        sortable: false,
        value: "transcription",
      },
      {
        text: "Перевод",
        align: "start",
        sortable: false,
        value: "wordTranslate",
      },
      {
        text: "Количество повторений",
        align: "start",
        sortable: false,
        value: "repeatCount",
      },
      {
        text: "Дата последнего повторения",
        align: "start",
        sortable: false,
        value: `lastDate`,
      },
      {
        text: "Дата планируемого повторения",
        align: "start",
        sortable: false,
        value: `repeatDate`,
      },
    ],
    tab: "tab-0",
    icons: false,
    tabs: [0, 1, 2],
    cuirrentDifficulty: 0,
    words: [],
    loading: true,
    WORDS_PER_PAGE: 20,
    audio: {},
  }),
  async mounted() {
    await this.getWords(this.tab.split("-")[1]);
    this.audio = new AudioControl();
  },
  computed: {
    cuirrentDifficultyCopy() {
      return this.cuirrentDifficulty + 1;
    },
  },
  watch: {
    tab(val) {
      this.loading = true;
      this.getWords(val.split("-")[1]);
    },
    page() {
      this.loading = true;
      this.getWords(this.tab.split("-")[1]);
    },
  },
  methods: {
    onSpeakClick(audio) {
      console.log(audio);
    },
    async getWords(tab) {
      const res = await this.$store.dispatch("getUserAggregateWords", {
        difficulty: parseInt(tab, 10),
        page: this.page - 1,
        wordsPerPage: this.WORDS_PER_PAGE,
      });
      if (!res.success) {
        this.showAlert("error", "Ошибка!", res.error);
      }
      this.pageCount = Math.ceil((res.add.totalCount ?? 1) / this.WORDS_PER_PAGE);
      this.words = res.result.map((w) => {
        return {
          word: w.word,
          audio: w.audio,
          transcription: w.transcription,
          wordTranslate: w.wordTranslate,
          repeatCount: w.userWord.optional.repeatCount,
          lastDate: new Date(w.userWord.optional.lastDate).toLocaleString("ru-Ru"),
          repeatDate: new Date(w.userWord.optional.repeatDate).toLocaleString("ru-Ru"),
        };
      });
      this.loading = false;
    },
    showAlert(type, title, text) {
      this.$notify({
        group: "main",
        type,
        title,
        text,
      });
    },
  },
};
</script>

<style></style>
