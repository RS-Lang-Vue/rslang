<template>
  <v-app>
    <notifications group="main" style="top: 30px; right: 15px;" />
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
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

<style scoped>
.notification {
  top: 30px;
  right: 30px;
}
</style>
