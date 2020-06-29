<template>
  <div class="ask-message">
    <v-img
      max-width="170px"
      src="../../../assets/images/sprint/mouse.png"
      alt=""
      @load="showContent()"
    ></v-img>
    <span> Выберите, соответствует ли перевод указанному слову?</span>
  </div>
</template>

<script>
export default {
  methods: {
    showContent() {
      document.querySelector(".content").classList.add("visible");
    },
  },
};
</script>

<style lang="scss" scoped>
.ask-message {
  display: flex;
  align-items: center;
  width: 50vw;
  span {
    margin-top: 30px;
    color: #ffffff;
    font-size: 25px;
    font-weight: 400;
  }
}
</style>
