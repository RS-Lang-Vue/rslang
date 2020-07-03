<template>
  <div>
    <h2>Savana game's page</h2>
    <h3>Пример работы с game-модулем:</h3>
    <p>Зашли в игру, вызываем setGame передавая название игры из опций:</p>
    <p>this.$store.dispatch("setGame", "gameSavannah");</p>
    <p>Узнаём какой уровень и раунд у игрока в этой игре через геттеры</p>
    <p>
      getters: "currentLevel" = <a>{{ currentLevel }}</a
      >, "currentRound" <a>{{ currentRound }}</a>
    </p>
    <p>Получаем слова для этого раунда:</p>
    <p>
      Вызывая this.$store.dispatch("getRoundWords") и получая в геттере roundWords
    </p>
    <p>
      Если для игры не нужны случайные ложные слова, то можно вызвать
      this.$store.dispatch("getRoundWords", false)
    </p>
    <p>Тогда в roundWords.randomWords будет пустой массив</p>
    <p>
      По умолачнию же roundWords.keyWords содержит 20 слов, часть из которых (или все) нужно
      использовать в игре
    </p>
    <p>roundWords.randomWords сожержит случайных 20 слов для генерации ложных вариантов ответа</p>
    <p>
      Слова в обоих массивах уже перемешаны, поэтому во время раунда можно брать слова по порядку
    </p>

    <p>После окончания раунда вызываем this.$store.dispatch("compliteRound")</p>
    <p>
      При этом меняются значения "currentGroup" и "currentRound" и настройки игры сохраняются на
      бэкенде
    </p>

    <h3>Пример полученных 20 слов:</h3>
    <h3>Уровень - {{ currentLevel + 1 }}, раунд - {{ currentRound + 1 }}</h3>
    <h3>keyWords:</h3>
    <div class="keyWords" v-for="word in roundWords.keyWords" :key="word.id">
      {{ word.word }} - {{ word.wordTranslate }}
    </div>
    <h3>randomWords:</h3>
    <div class="randomWords" v-for="word in roundWords.randomWords" :key="word.id">
      {{ word.word }} - {{ word.wordTranslate }}
    </div>

    <v-btn class="complete_round__button" large color="primary" @click="nextRound"
      >Round Complete</v-btn
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["roundWords", "currentLevel", "currentRound"]),
  async mounted() {
    this.$store.dispatch("setGame", "gameSavannah");
    this.$store.dispatch("getRoundWords");

    const { user } = this.$store.state.user;
    const firstWords = await this.$store.dispatch("getFreeWords", { group: 0, page: 0 });
    console.log(firstWords);
    const promises = [];
    firstWords.forEach((word) => {
      const optional = {
        group: word.group,
        repeatCount: 0,
        lastDate: 0,
        repeatDate: 0,
        description: "hard",
        word,
      };
      const userWord = {
        difficulty: "hard",
        optional,
      };
      console.log(userWord);
      const wordId = userWord.optional.word.id;
      const promise = this.$store.dispatch("setUserWords", {
        isNewWord: false,
        user,
        userWord,
        wordId,
      });
      promises.push(promise);
    });
    const a = await Promise.all(promises);
    console.log(a);

    const userWord1 = await this.$store.dispatch("getUserWords", { user });
    console.log(userWord1);

    const group = undefined;
    const isLearned = true;
    const userWords = await this.$store.dispatch("getUserAggregateWords", {
      user,
      isLearned,
      group
    });
    console.log(userWords);
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
