<template>
  <div class="home">
    <v-container>
      <!-- Stack the columns on mobile by making one full-width and the other half-width -->
      <v-row>
        <v-col cols="12" md="6" lg="4">
          <v-card class="mx-auto amber lighten-5" max-width="500">
            <v-card-title class="headline">Цель на сегодня</v-card-title>
            <v-card-text class="text-left">Завершить 50 карточек</v-card-text>
            <v-card-text class="text-left"
              >Сегодня вы выполнили 0 карточек. Для достижения цели завершите 50
              карточек</v-card-text
            >

            <v-card-actions>
              <v-btn text color="indigo accent-4" to="/learn">Выполнить</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" lg="4">
          <v-card class="mx-auto yellow lighten-5" max-width="500">
            <v-card-title class="headline">Статистика</v-card-title>

            <v-simple-table dense class="container__color">
              <tbody>
                <tr v-for="item in staticticList" :key="item.id">
                  <td class="text-left">{{ item.staticticTitle }}</td>
                  <td class="text-right">{{ item.staticticValue }}</td>
                </tr>
              </tbody>
            </v-simple-table>

            <v-card-actions>
              <v-btn text color="indigo accent-4" to="/stats">Подробнее</v-btn>
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
    mainButton: { title: "Играть", link: "/games/savana" },
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
    cardTitle: "Своя игра",
    cardSubtitle: "Мини игра",
    cardText:
      "Очень краткое описание игры. А возможно и статистика игрока. Типа, сыграно - столько, уровень - такой, изучено слов — столько.",
    mainButton: { title: "Играть", link: "/games/our-game" },
    additionalButton: { title: "Инфо", link: "" },
  },
];

const staticticList = [
  {
    staticticTitle: "Слова для практики",
    staticticValue: 11,
  },
  {
    staticticTitle: "Лучшая серия",
    staticticValue: 0,
  },
  {
    staticticTitle: "Пройдено слов по практике",
    staticticValue: 11,
  },
  {
    staticticTitle: "Правильные повторы, %",
    staticticValue: 0,
  },
  {
    staticticTitle: "Новые слова",
    staticticValue: 0,
  },
];

export default {
  data: () => ({
    cards,
    staticticList,
  }),
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
