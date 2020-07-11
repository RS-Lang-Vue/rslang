<template>
  <div class="main-layout">
    <side-nav />
    <v-dialog v-model="loading" persistent width="100" hide-overlay content-class="dialog-loader">
      <v-card dark class="loader-wrap">
        <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
      </v-card>
    </v-dialog>
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
import { mapGetters } from "vuex";
import SideNav from "@/components/common/sideNav/SideNav.vue";

export default {
  components: {
    "side-nav": SideNav,
  },
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
.main-layout {
  flex-grow: 2;
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
