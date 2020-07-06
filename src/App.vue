<template>
  <v-app id="app">
    <notifications group="main" style="top: 30px; right: 15px;" />
    <v-dialog v-model="loading" persistent width="100" hide-overlay content-class="dialog-loader">
      <v-card dark class="loader-wrap">
        <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
      </v-card>
    </v-dialog>
    <router-view />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["loading"]),
  },
};
</script>

<style>
.dialog-loader {
  box-shadow: none !important;
}
</style>

<style scoped>
.notification {
  top: 30px;
  right: 30px;
}
.loader-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  background: transparent !important;
}
</style>
