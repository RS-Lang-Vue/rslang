import Vue from "vue";
import VueRouter from "vue-router";

import AuthLayout from "@/views/layouts/Auth.vue";
import MainLayout from "@/views/layouts/Main.vue";
import EmptyLayout from "@/views/layouts/Empty.vue";

import authRoutes from "./auth";
import homeRoutes from "./home";
import statsRoutes from "./stats";
import vocabularyRoutes from "./vocabulary";
import gamesRoutes from "./games";
import promoRoutes from "./promo";
import teamRoutes from "./team";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    name: "auth",
    component: AuthLayout,
    children: authRoutes,
  },
  {
    path: "/",
    name: "main",
    component: MainLayout,
    children: [
      {
        path: "home",
        name: "home",
        component: EmptyLayout,
        children: homeRoutes,
      },
      {
        path: "stats",
        name: "stats",
        component: EmptyLayout,
        children: statsRoutes,
      },
      {
        path: "vocabulary",
        name: "vocabulary",
        component: EmptyLayout,
        children: vocabularyRoutes,
      },
      {
        path: "games",
        name: "games",
        component: EmptyLayout,
        children: gamesRoutes,
      },
      {
        path: "promo",
        name: "promo",
        component: EmptyLayout,
        children: promoRoutes,
      },
      {
        path: "team",
        name: "team",
        component: EmptyLayout,
        children: teamRoutes,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
