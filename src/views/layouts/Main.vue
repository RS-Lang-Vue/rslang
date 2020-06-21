<template>
  <div class="main-layout">
    <side-nav />

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <router-view class="main-layout__content"></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020 RS Lang</span>
    </v-footer>
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
.main-layout__content {
  background-color: red;
}
</style>
