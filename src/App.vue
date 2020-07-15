<template>
  <v-app id="app">
    <notifications group="main" style="top: 30px; right: 15px;" />
    <router-view />
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import checkToken from "@/helpers/check-token";

export default {
  name: "App",
  data() {
    return {
      tick: null,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "error"]),
  },
  watch: {
    isLoggedIn() {
      if (this.isLoggedIn) {
        this.startTimer();
      } else {
        this.stopTimer();
        this.$router.push("/auth/login");
      }
    },
    error() {
      if (this.error) this.showAlert("error", "Ошибка", this.error);
    },
  },
  created() {
    if (this.isLoggedIn) {
      if (checkToken.isTokenOutdated()) {
        this.unsetUser();
      } else {
        this.startTimer();
      }
    }
  },
  destroyed() {
    this.stopTimer();
  },
  methods: {
    ...mapActions(["refreshToken"]),
    ...mapMutations(["unsetUser"]),
    startTimer() {
      this.tick = async () => {
        if (checkToken.isTokenOutdated()) {
          this.unsetUser();
          return false;
        }
        if (checkToken.isTokenRequiresUpdating()) await this.refreshToken();
        setTimeout(this.tick, 5000);
        return true;
      };
      this.tick();
    },
    stopTimer() {
      clearTimeout(this.tick);
    },
    showAlert(type, title, text) {
      this.$notify({
        group: "main",
        type,
        title,
        text,
      });
    },
  },
};
</script>

<style scoped>
.notification {
  top: 30px;
  right: 30px;
}
</style>
