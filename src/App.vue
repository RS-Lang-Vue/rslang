<template>
  <v-app>
    <v-main>
      <notifications group="main" style="top: 30px; right: 15px;" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.notification {
  top: 30px;
  right: 30px;
}
</style>
