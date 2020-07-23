<template>
  <div>
    <div v-if="loading">
      <v-data-table
        item-key="name"
        hide-default-footer
        class="elevation-1"
        loading
        loading-text="Загружается... Пожалуйста, подождите."
      ></v-data-table>
    </div>
    <div v-else>
      <v-tabs
        v-model="tab"
        background-color="blue lighten-4 accent-4"
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
                <td>{{ row.item.status }}</td>
                <td>{{ row.item.repeatCount }}</td>
                <td>{{ row.item.lastDate }}</td>
                <td>{{ row.item.repeatDate }}</td>
                <td>
                  <v-btn icon small @click="showFullInfo(row.item)" title="Подробнее">
                    <v-icon dark>mdi-book-open-variant</v-icon>
                  </v-btn>
                </td>
                <td v-if="i === 2">
                  <v-btn icon small @click="sendToLearn(row.item)" title="Восстановить">
                    <v-icon dark>mdi-autorenew</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs>
      <div class="text-center">
        <v-pagination v-model="page" :length="pageCount" :total-visible="7"></v-pagination>
      </div>
    </div>
    <div class="text-center">
      <v-dialog v-model="fullInfo" max-width="500">
        <v-card class="mx-auto" max-width="500">
          <v-card-title>
            {{ fullInfoCard.word }} {{ fullInfoCard.transcription }} -
            {{ fullInfoCard.wordTranslate }}
            <v-btn icon small @click="audio.play(fullInfoCard.audio)">
              <v-icon dark>mdi-volume-high</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-subtitle>
            <b>Meaning: </b><span v-html="fullInfoCard.textMeaning"></span> <br />
            <b>Определение: </b>{{ fullInfoCard.textMeaningTranslate }}
          </v-card-subtitle>

          <v-img
            :src="fullInfoCard.image"
            max-height="281"
            lazy-src="../../assets/images/placeholder.png"
          ></v-img>

          <v-expand-transition>
            <div>
              <v-divider></v-divider>

              <v-card-text>
                <b>Example: </b><span v-html="fullInfoCard.textExample"></span> <br />
                <b>Пример: </b>{{ fullInfoCard.textExampleTranslate }}
              </v-card-text>
            </div>
          </v-expand-transition>

          <v-card-actions>
            <v-btn @click="hideFullInfo()" text>ЗАКРЫТЬ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import AudioControl from "@/helpers/audio-control";
import config from "@/config/config";

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
        text: "Статус",
        align: "start",
        sortable: false,
        value: "status",
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
    fullInfo: false,
    fullInfoCard: {
      word: "слово",
      transcription: "[транскрипция]",
      wordTranslate: "перевод",
      repeatCount: "0",
      lastDate: "-",
      repeatDate: "-",
      image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
      textExample: "example",
      textExampleTranslate: "пример",
      textMeaning: "meaning",
      textMeaningTranslate: "определение",
    },
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
        const status = this.getStatusText(w.userWord.optional.status);
        return {
          word: w.word,
          audio: w.audio,
          transcription: w.transcription,
          wordTranslate: w.wordTranslate,
          status,
          repeatCount: w.userWord.optional.repeatCount,
          lastDate: new Date(w.userWord.optional.lastDate).toLocaleString("ru-Ru"),
          repeatDate: new Date(w.userWord.optional.repeatDate).toLocaleString("ru-Ru"),
          image: `${config.dataBaseUrl}${w.image}`,
          textExample: w.textExample,
          textExampleTranslate: w.textExampleTranslate,
          textMeaning: w.textMeaning,
          textMeaningTranslate: w.textMeaningTranslate,
          _word: w,
        };
      });
      this.loading = false;
    },
    async sendToLearn(word) {
      this.loading = true;
      await this.$store.dispatch("changeDifficulty", {
        difficulty: "0",
        wordId: word._word._id,
      });
      this.getWords(this.tab.split("-")[1]);
    },
    getStatusText(status) {
      switch (status) {
        case "1":
          return "изучение";
        case "2":
          return "повторение";
        case "3":
          return "напоминание";
        case "4":
          return "изучено";
        default:
        case "0":
          return "новое";
      }
    },
    showFullInfo(word) {
      this.fullInfoCard = word;
      this.fullInfo = true;
    },
    hideFullInfo() {
      this.fullInfo = false;
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
