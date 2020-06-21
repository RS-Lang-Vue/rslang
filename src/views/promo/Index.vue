<template>
  <v-main class="promo">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col class="promo__text_center">
          <h1 class="promo__header">RS Lang</h1>
          <p class="promo__title">
            представляет собой оптимальный интеллектуальный способ изучения слов английского языка
          </p>
          <v-btn class="promo__button" large color="primary" @click="$router.push('home')"
            >Начать</v-btn
          >
          <v-btn class="promo__button" text large color="primary">Войти</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.promo__header {
  font-style: normal;
  font-weight: 300;
  font-size: 96px;
  line-height: 112px;
}

.promo__title {
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 24px;
  font-size: 28px;
  line-height: 42px;
  text-align: center;
}

.promo__button {
  margin: 24px;
}
</style>
