<template>
  <div class="controls">
    <Statistic />
    <Setting />
  </div>
</template>

<script>
import Statistic from "./components/Statistic.vue";
import Setting from "./components/Setting.vue";

export default {
  components: {
    Statistic,
    Setting,
  },
};
</script>

<style>
.controls {
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100vw;
  bottom: 40px;
}
</style>
