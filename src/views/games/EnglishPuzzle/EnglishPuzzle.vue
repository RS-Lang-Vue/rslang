<template>
  <div>
    <img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" class="bg cyan" />
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
img.bg {
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  @media screen and (max-width: 1024px) {
    left: 50%;
    margin-left: -512px;
  }
}
</style>
