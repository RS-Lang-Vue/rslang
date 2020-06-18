import Vue from "vue";
import VueRouter from "vue-router";

import AuthLayout from "@/views/layouts/Auth.vue";
import MainLayout from "@/views/layouts/Main.vue";
import EmptyLayout from "@/views/layouts/Empty.vue";

import PromoPage from "@/views/promo/Index.vue";

import authRoutes from "./auth";
import homeRoutes from "./home";
import learnRoutes from "./learn";
import statsRoutes from "./stats";
import vocabularyRoutes from "./vocabulary";
import gamesRoutes from "./games";
import teamRoutes from "./team";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "promo",
    component: PromoPage,
  },
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
        path: "learn",
        name: "learn",
        component: EmptyLayout,
        children: learnRoutes,
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
