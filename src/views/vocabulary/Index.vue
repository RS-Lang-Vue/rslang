<template>
  <v-data-table
    :headers="headers"
    :items="words"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Словарь</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">Подробнее {{ item.name }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
    state: {
      words: [],
    },
    async mounted() {
      console.log("mounted...");
      const res = await this.$store.dispatch("getUserAggregateWords", {});
      if (!res.success) {
        alert(res.error);
      } else {
        this.words = res.result;
      }
      console.log("mounted", this.words);
    },
    data () {
      console.log("data", this.words);
      return {
        expanded: [],
        singleExpand: false,
        headers: [
          {
            text: "Слово",
            align: "start",
            value: "word",
          },
          { text: "Произношение", sortable: false, value: "audio" },
          { text: "Перевод", value: "wordTranslate" },
          { text: "Транскрипция", value: "transcription" },
          { text: "Количетсво повторений", value: "userWord?.optional?.repeatCount" },
          { text: "Последнее повторение", value: "userWord?.optional?.lastDate" },
          { text: "Следующее повторение", value: "userWord?.optional?.repeatDate" },
        ],
        words: this.words        
      }
    },
  }
</script>

<style></style>
