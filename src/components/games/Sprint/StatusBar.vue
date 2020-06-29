<template>
  <div class="status-bar">
    <div class="streak">
      <img
        class="streak__img"
        src="../../../assets/images/sprint/randy1.png"
        v-for="n in streak.count"
        :key="n"
      />
    </div>
    <div class="message-area"></div>
    <div class="score">{{ score }}</div>
  </div>
</template>

<script>
export default {
  props: ["streak", "score"],
};
</script>

<style lang="scss" scoped>
.status-bar {
  display: flex;
  justify-content: center;
  width: 100%;
  .score,
  .streak,
  .message-area {
    width: 30%;
  }

  .score {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: #ffffff;
  }
}

.streak {
  display: flex;
  justify-content: center;

  .streak__img {
    width: 60px;
  }

  .streak__img.hide {
    opacity: 0;
  }
}
</style>
