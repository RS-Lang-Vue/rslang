<template>
  <div>
    <div class="bg"></div>
    <Main />
  </div>
</template>

<script>
import Main from "@/components/games/EnglishPuzzle/Main.vue";

export default {
  components: {
    Main,
  },
};
</script>

<style lang="scss" scoped>
.bg {
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #193c6d;
  background-image: linear-gradient(135deg, #003073, #029797);
  @media screen and (max-width: 1024px) {
    left: 50%;
    margin-left: -512px;
  }
}
</style>
