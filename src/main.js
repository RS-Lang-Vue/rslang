import Vue from "vue";
import Notifications from "vue-notification";
import CircularCountDownTimer from "vue-circular-count-down-timer";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/main.scss";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(CircularCountDownTimer);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
