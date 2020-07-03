<template>
  <div class="promo">
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <div class="bg">
          <Emblem />
        </div>
        <h1 class="promo__header">ENGLISH PUZZLE</h1>
        <p class="promo__title">
          Нажимайте на слова, собирайте фразы. Слова можно перетаскивать. Выберите необходимые
          подсказки в меню.
        </p>
        <v-btn
          class="promo__button"
          large
          color="primary"
          @click="$router.push('/games/english-puzzle')"
          >Начать игру</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Emblem from "@/components/games/EnglishPuzzle/Emblem.vue";

export default {
  components: {
    Emblem,
  },
};
</script>

<style lang="scss" scoped>
.text-center {
  position: relative;
  margin-top: 30%;
  @media (min-width: 375px) {
    margin-top: 20%;
  }
  @media (min-width: 600px) {
    margin-top: 15%;
  }
  @media (min-width: 960px) {
    margin-top: 10%;
  }
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.promo__header {
  font-style: normal;
  font-weight: 300;
  font-size: 55px;
  line-height: 64px;
  @media (min-width: 375px) {
    font-size: 65px;
    line-height: 75px;
  }
  @media (min-width: 600px) {
    font-size: 73px;
    line-height: 85px;
  }
  @media (min-width: 960px) {
    font-size: 96px;
    line-height: 112px;
  }
}
.promo__title {
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  @media (min-width: 375px) {
    font-size: 20px;
    line-height: 24px;
  }
  @media (min-width: 600px) {
    font-size: 23px;
    line-height: 28px;
  }
  @media (min-width: 960px) {
    font-size: 28px;
    line-height: 42px;
  }
}
.promo__button {
  margin: 24px;
}
</style>
