<template>
  <div class="home">
    <v-container>
      <!-- Stack the columns on mobile by making one full-width and the other half-width -->
      <v-row>
        <v-col cols="12" md="6" lg="4">
          <v-card class="mx-auto" max-width="500">
            <v-card-title class="headline">Статистика</v-card-title>
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
              <v-btn text color="indigo accent-4">Подробнее</v-btn>
              <v-btn text color="indigo accent-4">Словарь</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" lg="4">
          <v-card class="mx-auto" max-width="500">
            <v-card-title class="headline">Цель на сегодня</v-card-title>
            <v-card-text class="text-left">Завершить 50 карточек</v-card-text>
            <v-card-text class="text-left"
              >Сегодня вы выполнили 0 карточек. Для достижения цели завершите 50
              карточек</v-card-text
            >

            <v-card-actions>
              <v-btn text color="indigo accent-4">Достигнуть цели</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="card in cards" :key="card.id">
          <v-card color="pink lighten-5" class="mx-auto" max-width="500">
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
    cardText:
      "Очень краткое описание игры. А возможно и статистика игрока. Типа, сыграно - столько, уровень - такой, изучено слов — столько.",
    mainButton: { title: "Играть", link: "/games/english-puzzle" },
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

export default {
  data: () => ({
    cards,
  }),
};
</script>

<style scoped>
.home {
  /* background-color: #e0e0e0; */
}
</style>
