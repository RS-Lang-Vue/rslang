import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

import AuthLayout from "@/views/layouts/Auth.vue";
import MainLayout from "@/views/layouts/Main.vue";
import EmptyLayout from "@/views/layouts/Empty.vue";

import PromoPage from "@/views/promo/Index.vue";

import authRoutes from "./auth";
import homeRoutes from "./home";
import learnRoutes from "./learn";
import statsRoutes from "./stats";
import settingsRoutes from "./settings";
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
    meta: {
      onlyNotAuth: true,
    },
    children: authRoutes,
  },
  {
    path: "/",
    name: "main",
    component: MainLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "home",
        component: EmptyLayout,
        children: homeRoutes,
      },
      {
        path: "learn",
        component: EmptyLayout,
        children: learnRoutes,
      },
      {
        path: "stats",
        component: EmptyLayout,
        children: statsRoutes,
      },
      {
        path: "vocabulary",
        component: EmptyLayout,
        children: vocabularyRoutes,
      },
      {
        path: "games",
        component: EmptyLayout,
        children: gamesRoutes,
      },
      {
        path: "team",
        component: EmptyLayout,
        children: teamRoutes,
      },
      {
        path: "settings",
        component: EmptyLayout,
        children: settingsRoutes,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (store.getters.isLoggedIn && to.matched.some((record) => record.meta.onlyNotAuth)) {
    next("/home");
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
