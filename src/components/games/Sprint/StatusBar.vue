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
  .streak {
    width: 50%;
  }

  .score {
    display: flex;
    position: relative;
    top: 0;
    right: 0;
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

@media screen and (max-width: 500px) {
  .streak__img {
    width: 30px !important;
    height: 30px;
  }
}
</style>
