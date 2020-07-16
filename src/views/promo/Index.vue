<template>
  <v-main class="promo">
    <div
      align="center"
      justify="center"
      class="fill-height text-sm-body-2 text-md-body-1 text-lg-subtitle-1"
      style="max-width: 1024px; margin: 0 auto;"
    >
      <v-card
        align="center"
        justify="center"
        style="display: flex; flex-direction: column; justify-content: center; height: 100vh;"
        elevation="0"
      >
        <v-card-title class="promo__header text-center">RS Lang</v-card-title>
        <p class="promo__title">
          представляет собой оптимальный интеллектуальный способ изучения слов английского языка
        </p>
        <v-card-actions>
          <v-btn class="promo__button" large color="primary" @click="checkLogin">Вход</v-btn>
          <v-btn
            class="promo__button"
            text
            large
            color="primary"
            @click="$router.push('/auth/register')"
            >Регистрация
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon class="promo__button">
            <a class="github" href="https://github.com/RS-Lang-Vue/rslang" target="_blank"
              ><v-icon x-large>mdi-github</v-icon></a
            >
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-container>
        <v-card class="mt-4 mb-4" align="center" justify="center">
          <v-img
            max-width="100%"
            style="margin: 0 auto;"
            src="../../assets/images/img-promo1.jpg"
            lazy-src="../../assets/images/placeholder.png"
          ></v-img>
          <v-card-subtitle style="text-align: justify;">
            В современном обществе, кажется, проще найти человека, не умеющего готовить, нежели не
            знающего английский язык. Поэтому меньше слов, больше дела! Мы создали для вас
            уникальное веб приложения для изучения английского языка, которые гарантированно сделают
            процесс обучения легким и приятным!
          </v-card-subtitle>
        </v-card>
        <v-card class="mt-4 mb-4" align="center" justify="center">
          <v-card-title class="mt-2">
            Алгоритм используемой в приложении методики интервального повторения
          </v-card-title>
          <v-img max-width="100%" style="margin: 0 auto;" src="../../assets/images/MIR.png"></v-img>
        </v-card>
      </v-container>
    </div>
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

<style lang="scss" scoped>
.promo__header {
  font-style: normal;
  font-weight: 300;
  font-size: 55px;
  line-height: 64px;
  text-align: center !important;
  margin: 0 auto;
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
  margin-bottom: 0;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  @media (min-width: 375px) {
    font-size: 17px;
    line-height: 21px;
  }
  @media (min-width: 600px) {
    margin-bottom: 18px;
    font-size: 20px;
    line-height: 24px;
  }
  @media (min-width: 960px) {
    margin-bottom: 24px;
    font-size: 24px;
    line-height: 36px;
  }
}

.promo__button {
  margin: 24px;
  @media (max-width: 600px) {
    font-size: 0.75rem !important;
    height: 28px !important;
    min-width: 50px !important;
    padding: 0 12.4444444444px !important;
    margin: 12px;
  }
}

.promo-text {
  max-width: 900px;
  margin: auto;
}

.github {
  text-decoration: none;
}
</style>
