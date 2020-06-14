<template>
  <div class="main-layout">
    <side-nav class="main-layout__side-nav"></side-nav>
    <router-view class="main-layout__content"></router-view>
  </div>
</template>

<script>
import SideNav from "@/components/common/sideNav/SideNav.vue";

export default {
  components: {
    "side-nav": SideNav,
  },
};
</script>

<style scoped>
.main-layout {
  display: flex;
  justify-content: space-between;
}

.main-layout__side-nav {
  width: 30%;
  height: 100vh;
  box-sizing: border-box;
}

.main-layout__content {
  width: 70%;
  box-sizing: border-box;
}
</style>
