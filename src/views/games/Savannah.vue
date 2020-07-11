<template>
  <div>
    <h2>Savana game's page</h2>
    <h3>Смотри в консоле тестирование и некоторрое описание модуля</h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["roundWords", "currentLevel", "currentRound"]),
  async mounted() {
    console.log("Тестирование:");

    console.log("- ApiService");

    console.log("-- Words (получение слов для неавторизованного пользователя)");
    console.log("--- Получаем первые 20");
    let res = await this.$store.dispatch("getWords", {});
    let learnedUserWord = res.result[15];
    const learnedWordId = learnedUserWord.id;
    console.log("---- words", res);

    console.log("--- Получаем слова для 3-ого уровня 6 раунда");
    res = await this.$store.dispatch("getWords", {
      group: 2,
      page: 5,
      wordsPerPage: 20,
    });
    const wordsG3P6 = res.result;
    console.log("---- words", res);

    console.log(
      "--- Получаем первые 5 слов 2-ого уровня с третьей страницы, где слов в примере не больше 10"
    );
    res = await this.$store.dispatch("getWords", {
      group: 1,
      page: 2,
      wordsPerPage: 5,
      wordsPerExampleSentenceLTE: 10,
    });
    console.log("---- words", res);

    console.log("-- UsersWords (получение слов для авторизованного пользователя)");

    console.log("--- Меняем статистику слова");
    const random = Math.floor(Math.random() * 1000);
    console.log("---- Установим случайное количество повторений repeatCount -", random);
    learnedUserWord = {
      difficulty: "0",
      optional: {
        repeatCount: random,
        lastDate: Date.now(),
        repeatDate: Date.now() + 10000,
        description: "hard",
      },
    };
    res = await this.$store.dispatch("setUserWordWithCheck", {
      userWord: learnedUserWord,
      wordId: learnedWordId,
    });
    learnedUserWord = res.result;
    console.log("---- words", res);

    console.log("--- Получаем изученное слово по id");
    res = await this.$store.dispatch("getUsersWordsById", { wordId: learnedWordId });
    learnedUserWord = res.result;
    console.log("---- words", res);

    console.log("--- Получаем все изученные слова");
    res = await this.$store.dispatch("getUsersWords");
    console.log("---- words", res);

    console.log("--- Пытаемся получить неизученное ранее слово из библиотеки изученных слов");
    res = await this.$store.dispatch("getUsersWordsById", { wordId: "5e9f5ee35eb9e72bc21af706" });
    console.log("---- words", res);

    console.log("-- AggregatedWords (получение комбинированных слов)");

    console.log("--- Пытаемся получить первые 15 слов");
    res = await this.$store.dispatch("getUserAggregateWords", { page: 0, wordsPerPage: 15 });
    console.log("---- words", res);

    console.log("--- Получаем все изученные слова c dif 0");
    res = await this.$store.dispatch("getUserAggregateWords", { difficulty: 0 });
    learnedUserWord = res.result;
    console.log("---- words", res);

    console.log("--- Получаем все изученные слова c dif 1");
    res = await this.$store.dispatch("getUserAggregateWords", { difficulty: 1 });
    learnedUserWord = res.result;
    console.log("---- words", res);

    console.log("--- Пытаемся получить все 3600 комбинированных слов");
    res = await this.$store.dispatch("getUserAggregateWords", {});
    console.log("---- words", res);

    console.log("--- Пытаемся получить первые 30 изученных слов (но изучено вероятно меньше)");
    res = await this.$store.dispatch("getUserAggregateWords", {
      page: 0,
      wordsPerPage: 30,
      onlyLearned: true,
    });
    console.log("---- words", res);

    console.log("--- Пытаемся получить словая для 3-ого уровня 6 раунда");
    res = await this.$store.dispatch("getUserAggregateWords", {
      group: 2,
      page: 5,
      wordsPerPage: 20,
    });
    console.log("---- words", res);
    console.log("---- можно свериться этим же раундом из свободной библиотеки", wordsG3P6);

    console.log("- WordHelper");

    console.log("--- Отправляем в модуль айди слова и правльно ли ответил игрок");
    console.log("---- Такая статистика была до вызова", learnedUserWord);
    res = await this.$store.dispatch("addAnswerResult", {
      wordId: learnedWordId,
      isCorrectAnswer: false,
    });
    console.log("---- результат", res);

    console.log("--- Заходим в игру Савана и запрашиваем слова для игры");
    this.$store.dispatch("setGame", "gameSavannah");
    res = await this.$store.dispatch("getRoundWords");
    console.log("---- результат", res);

    console.log("--- Запрашиваем отсортированные по повторению изученные слова");
    res = await this.$store.dispatch("getLearnedWordsSortByRepeatDate", { count: 50 });

    console.log("CHECKKK");
    res = await this.$store.dispatch("getUserAggregateWords", {
      page: 0,
      wordsPerPage: 50,
      onlyLearned: true,
    });
    console.log("---- результат", res);

    console.log("--- Запрашиваем отсортированные по повторению изученные слова (dif 0)");
    res = await this.$store.dispatch("getLearnedWordsSortByRepeatDate", {
      count: 30,
      difficulty: 0,
    });
    console.log("---- результат", res);

    console.log("!! Test ApiTest Words complite");
  },
  methods: {
    nextRound() {
      this.$store.dispatch("compliteRound");
      this.$store.dispatch("getRoundWords");
    },
  },
};
</script>

<style></style>
