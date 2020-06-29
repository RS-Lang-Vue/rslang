<template>
  <div class="promo">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col class="text-center">
          <h1 class="promo__header">ENGLISH PUZZLE</h1>
          <p class="promo__title">
            Click on words, collect phrases. Words can be drag and drop. Select tooltips in the menu
          </p>
          <v-btn
            class="promo__button"
            large
            color="primary"
            @click="$router.push('/games/english-puzzle')"
            >Start game</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
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
