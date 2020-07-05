<template>
  <div>
    <div class="bg"></div>
    <Main />
  </div>
</template>

<script>
import Main from "@/components/games/FindThePair/Main.vue";

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
  background-image: url(https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media screen and (max-width: 1024px) {
    left: 50%;
    margin-left: -512px;
  }
}
</style>
