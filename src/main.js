import Vue from "vue";
import Notifications from "vue-notification";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/main.scss";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(Notifications);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
