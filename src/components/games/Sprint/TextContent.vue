<template>
  <div class="text-content__wrapper">
    <div class="words-wrapper">
      <span class="word">{{ sourceData[countWords].word }} </span>
      <v-icon dark large>mdi-arrow-right-bold</v-icon>
      <span class="word-translate">
        {{ exampleData[countWords] }}
      </span>
    </div>

    <div class="wrapper__help">
      <div class="help" @click="makeTextVisible()">
        <span class="text-example hide" v-html="sourceData[countWords].textExample"></span>
        <v-icon large dark>mdi-help-circle-outline</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["exampleData", "countWords", "sourceData"],
  methods: {
    makeTextVisible() {
      document.querySelector(".text-example").classList.remove("hide");
    },
  },
};
</script>

<style lang="scss" scoped>
.text-content__wrapper {
  display: flex;
  height: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.words-wrapper {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin: 0 20px;
    color: #ffffff;
    font-size: 35px;
    text-transform: capitalize;
  }
}

.wrapper__help {
  height: 100px;
}
.help {
  display: flex;
  max-width: 100%;
  justify-content: center;
  padding: 5px 20px;
  border: 2px solid #ffffff;
  border-radius: 5px;
  cursor: pointer;

  .text-example {
    margin-right: 20px;
    color: #ffffff;
    font-size: 25px;
    user-select: none;
  }
  .text-example.hide {
    filter: blur(5px);
  }
}
</style>
