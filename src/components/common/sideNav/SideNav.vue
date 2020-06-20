<template>
  <nav class="side-nav">
    <router-link to="/home" class="side-nav__link">Home</router-link>
    <router-link to="/learn" class="side-nav__link">Learn</router-link>
    <router-link to="/stats" class="side-nav__link">Statistics</router-link>
    <router-link to="/vocabulary" class="side-nav__link">Vocabulary</router-link>
    <router-link to="/games" class="side-nav__link">Games</router-link>
    <router-link to="/team" class="side-nav__link">About Team</router-link>
    <v-btn @click="logout" color="error">Log out</v-btn>
  </nav>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    logout() {
      this.unsetUser();
      this.$router.push("/auth/login");
    },
    ...mapMutations(["unsetUser"]),
  },
};
</script>

<style scoped>
.side-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.side-nav__link {
  margin-bottom: 10px;
}
</style>
