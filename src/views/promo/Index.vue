<template>
  <v-main class="promo">
    <v-container class="my-16" fluid>
      <v-row align="center" justify="center">
        <v-col class="text-center">
          <h1 class="promo__header">RS Lang</h1>
          <p class="promo__title">
            представляет собой оптимальный интеллектуальный способ изучения слов английского языка
          </p>
          <v-btn class="promo__button" large color="primary" @click="checkLogin">Войти</v-btn>
          <v-btn
            class="promo__button"
            text
            large
            color="primary"
            @click="$router.push('/auth/register')"
            >Зарегистрироваться</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row class="mt-6 mb-8" align="center" justify="center">
        <v-col class="text-center">
          <p class="promo-text">
            В современном обществе, кажется, проще найти человека, не умеющего готовить, нежели не
            знающего английский язык. Поэтому меньше слов, больше дела! Мы создали для вас
            уникальное веб приложения для изучения английского языка, которые гарантированно сделают
            процесс обучения легким и приятным!
          </p>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col class="text-center">
          <v-img
            max-width="800"
            style="margin: 0 auto;"
            src="../../assets/images/img-promo1.jpg"
          ></v-img>
          <!-- <h1 class="promo__header">RS Lang</h1> -->
        </v-col>
      </v-row>

      <v-row class="my-8" align="center" justify="center">
        GitHub приложения:
        <a href="https://github.com/RS-Lang-Vue/rslang" target="_blank"
          >https://github.com/RS-Lang-Vue/rslang</a
        >
      </v-row>

      <v-row align="center" justify="center">
        <v-col class="text-center">
          <h3 class="mt-2">Алгоритм используемой в приложении методики интервального повторения</h3>
          <v-img max-width="1000" style="margin: 0 auto;" src="../../assets/images/MIR.png"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    checkLogin() {
      if (this.isLoggedIn) {
        this.$router.push("/home");
      } else {
        this.$router.push("/auth/login");
      }
    },
  },
};
</script>

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

.promo-text {
  max-width: 900px;
  margin: auto;
}
</style>
