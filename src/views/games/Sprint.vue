<template>
  <div class="wrapper">
    <div class="card" v-if="!loading">
      <div class="words-wrapper">
        <span class="word">{{ wordsData[0].word }} </span>
        <span class="wordTranslate"> {{ wordsData[0].wordTranslate }} </span>
      </div>

      <div class="controls">
        <v-btn large color="green darken-1">Верно</v-btn>
        <v-btn right large color="red darken-4">Не Верно</v-btn>
      </div>
    </div>
    <div class="loader" v-else>Загрузка данных</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wordsData: [],
      loading: true,
    };
  },
  async mounted() {
    const res = await fetch("https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0");
    const data = await res.json();
    this.wordsData = data;
    this.loading = false;
    console.log(data, "origin");
    const arr = data.map((el) => {
      const example = el;
      example.word = "test";
      return el;
    });
    console.log(arr, "mutation");
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: center/ cover
    url("https://images.hdqwalls.com/wallpapers/future-sports-car-neon-sunset-background-4k-il.jpg");
  overflow: hidden;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 50vw;
  height: 50vh;
  background: rgba(29, 29, 29, 0.404);
  border-radius: 3%;
}
.words-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    color: #ffffff;
    font-size: 35px;
    text-transform: capitalize;
  }
}
.controls {
  display: flex;
  justify-content: space-around;
  width: 50%;
}
</style>
