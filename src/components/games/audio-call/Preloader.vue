<template>
  <div class="preloader">
    <v-progress-circular indeterminate :size="50" color="purple"></v-progress-circular>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(black, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
