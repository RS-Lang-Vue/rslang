<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" lg="5">
          <v-card class="mx-auto amber lighten-5" max-width="500">
            <v-card-title class="headline">Задача на сегодня</v-card-title>
            <v-card-text class="text-left pb-1">
              <span v-if="getIsNewWordsLearned && getIsRepeatWordsLearned">
                Вы достигли цели. Пройдено карточк - {{ wordsPerDay }}</span
              >
              <span v-else>
                Изучить {{ wordsPerDay }} карточек, в том числе {{ newWordsPerDay }} новых
              </span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="indigo accent-4"
                @click="startLean(LEARN_TYPE_ALL)"
                :disabled="getIsNewWordsLearned && getIsRepeatWordsLearned"
                >Выполнить</v-btn
              >
            </v-card-actions>

            <v-card-text class="text-left pb-1">
              <p>
                Сегодня вы изучили {{ getCountLearnedNewCard }} новых слов.
                <span v-if="getIsNewWordsLearned">Новые слова все изучены</span>
              </p>
              <p>
                Повторили {{ getCountLearnedRepeatCard }} карточек.
                <span v-if="getIsRepeatWordsLearned">Для повторения больше нет</span>
              </p>
            </v-card-text>
            <v-card-actions class="flex-wrap">
              <v-btn
                text
                color="indigo accent-4"
                @click="startLean(LEARN_TYPE_NEW)"
                :disabled="getIsNewWordsLearned"
                >Изучить новые</v-btn
              >
              <v-btn
                text
                color="indigo accent-4"
                @click="startLean(LEARN_TYPE_REPEAT)"
                :disabled="wordsPerDay === newWordsPerDay || getIsRepeatWordsLearned"
                >Повторить слова</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" lg="5">
          <v-card class="mx-auto yellow lighten-5" max-width="500">
            <v-card-title class="headline">Текущая статистика</v-card-title>

            <v-simple-table dense class="container__color">
              <tbody>
                <tr>
                  <td class="text-left">Пройдено карточек</td>
                  <td class="text-right">
                    {{ getCountLearnedNewCard + getCountLearnedRepeatCard }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left">Изученно новых слов</td>
                  <td class="text-right">{{ getCountLearnedNewCard }}</td>
                </tr>
                <tr>
                  <td class="text-left">Количество попыток</td>
                  <td class="text-right">{{ getCountAttemptsAllCards }}</td>
                </tr>
                <tr>
                  <td class="text-left">Процент правильных ответов</td>
                  <td class="text-right">{{ percentageOfCrrectAnswers }}</td>
                </tr>
                <tr>
                  <td class="text-left">Лучшая серия правильных ответов</td>
                  <td class="text-right">
                    {{ getCurrentLearnStateObject.bestCorrectAnswersSeries }}
                  </td>
                </tr>
              </tbody>
            </v-simple-table>

            <v-card-actions>
              <v-btn text color="indigo accent-4" to="/vocabulary">Словарь</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="card in cards" :key="card.id">
          <v-card color="blue lighten-5" class="mx-auto" max-width="500">
            <v-card-title class="headline">{{ card.cardTitle }}</v-card-title>
            <v-card-subtitle class="text-left">{{ card.cardSubtitle }}</v-card-subtitle>
            <v-card-text class="text-left">{{ card.cardText }}</v-card-text>
            <v-card-actions>
              <v-btn text color="indigo accent-4" :to="card.mainButton.link">{{
                card.mainButton.title
              }}</v-btn>
              <v-btn text color="indigo accent-4">{{ card.additionalButton.title }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { LEARN_TYPE_ALL, LEARN_TYPE_NEW, LEARN_TYPE_REPEAT } from "@/config/constants";
import { mapGetters } from "vuex";

const cards = [
  {
    cardTitle: "SpeakIt",
    cardSubtitle: "Мини игра",
    cardText:
      "Очень краткое описание игры. А возможно и статистика игрока. Типа, сыграно - столько, уровень - такой, изучено слов — столько.",
    mainButton: { title: "Играть", link: "/games/speak-it" },
    additionalButton: { title: "Инфо", link: "" },
  },
  {
    cardTitle: "English puzzle",
    cardSubtitle: "Мини игра",
    cardText: "Цель игры - собрать предложения из размещённых в случайном порядке английских слов.",
    mainButton: { title: "Играть", link: "/games/start-english-puzzle" },
    additionalButton: { title: "Инфо", link: "" },
  },
  {
    cardTitle: "Саванна",
    cardSubtitle: "Мини игра",
    cardText:
      "Очень краткое описание игры. А возможно и статистика игрока. Типа, сыграно - столько, уровень - такой, изучено слов — столько.",
    mainButton: { title: "Играть", link: "/games/savannah" },
    additionalButton: { title: "Инфо", link: "" },
  },
  {
    cardTitle: "Аудиовызов",
    cardSubtitle: "Мини игра",
    cardText:
      "Очень краткое описание игры. А возможно и статистика игрока. Типа, сыграно - столько, уровень - такой, изучено слов — столько.",
    mainButton: { title: "Играть", link: "/games/audio-call" },
    additionalButton: { title: "Инфо", link: "" },
  },
  {
    cardTitle: "Спринт",
    cardSubtitle: "Мини игра",
    cardText:
      "Очень краткое описание игры. А возможно и статистика игрока. Типа, сыграно - столько, уровень - такой, изучено слов — столько.",
    mainButton: { title: "Играть", link: "/games/sprint" },
    additionalButton: { title: "Инфо", link: "" },
  },
  {
    cardTitle: "Find The Pair",
    cardSubtitle: "Мини игра",
    cardText:
      "Игра развивает память и помогает изучать слова. Изучение построено на сопоставлении слова и картинки.",
    mainButton: { title: "Играть", link: "/games/start-find-the-pair" },
    additionalButton: { title: "Инфо", link: "" },
  },
];

// const staticticList = [
//   {
//     staticticTitle: "Пройдено карточек",
//     staticticValue: this.getCountLearnedNewCard + this.getCountLearnedRepeatCard,
//   },
//   {
//     staticticTitle: "Изученно новых слов",
//     staticticValue: this.getCountLearnedNewCard,
//   },
//   {
//     staticticTitle: "Количество попыток",
//     staticticValue: this.getCountAttemptsAllCards,
//   },
//   {
//     staticticTitle: "Процент правильных ответов",
//     staticticValue: this.percentageOfCrrectAnswers,
//   },
//   {
//     staticticTitle: "Лучшая серия правильных ответов",
//     staticticValue: this.getCurrentLearnStateObject.bestCorrectAnswersSeries,
//   },
// ];

export default {
  data: () => ({
    cards,
    LEARN_TYPE_ALL,
    LEARN_TYPE_NEW,
    LEARN_TYPE_REPEAT,
  }),
  computed: {
    ...mapGetters([
      "getCountLearnedNewCard",
      "getCountLearnedRepeatCard",
      "getIsNewWordsLearned",
      "getIsRepeatWordsLearned",
      "getCountAttemptsAllCards",
      "getCurrentLearnStateObject",
    ]),

    wordsPerDay() {
      return this.$store.state.userSettings.optional.learn.wordsPerDay;
    },
    newWordsPerDay() {
      return this.$store.state.userSettings.optional.learn.newWordsPerDay;
    },

    percentageOfCrrectAnswers() {
      const percentage = Math.round(
        ((this.getCountLearnedNewCard + this.getCountLearnedRepeatCard) /
          this.getCountAttemptsAllCards) *
          100
      );
      if (Number.isNaN(percentage)) return "-";
      return percentage;
    },
  },
  async created() {
    this.$store.dispatch("setLoading", true);
    try {
      await this.$store.dispatch("downloadSettings");
    } finally {
      this.$store.dispatch("setLoading", false);
    }
  },

  methods: {
    startLean(type) {
      this.$store.commit("updateLearnType", type);
      this.$router.push("/learn");
    },
  },
};
</script>

<style scoped>
.container__color {
  background-color: inherit !important;
}

.container__color tr:hover {
  background-color: inherit !important;
}

.statictic-name {
  flex-grow: 8;
  text-align: start;
}
.statictic-value {
  justify-content: flex-end;
}
</style>
