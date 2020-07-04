<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">User Name</v-list-item-title>
            <v-list-item-subtitle>login@email.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div class="drawer-group" v-for="list in drawerGroups" :key="list.id">
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item v-for="item in list" :key="item.id" link :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item @click="handleLogout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app collapse-on-scroll color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>RS Lang{{ title }}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

const drawerGroups = [
  [
    { link: "/home", icon: "mdi-home", title: "Главная страница" },
    { link: "/team", icon: "mdi-account-group", title: "О команде" },
    { link: "/stats", icon: "mdi-chart-bar", title: "Статистика" },
    { link: "/vocabulary", icon: "mdi-bookshelf", title: "Словарь" },
    { link: "/settings", icon: "mdi-cog", title: "Настройки" },
  ],
  [
    { link: "/learn", icon: "mdi-alphabetical-variant", title: "Словарная тренировка" },
    { link: "/games/speak-it", icon: "mdi-nintendo-game-boy", title: 'Игра "SpeakIt"' },
    {
      link: "/games/start-english-puzzle",
      icon: "mdi-nintendo-game-boy",
      title: 'Игра "English puzzle"',
    },
    { link: "/games/savana", icon: "mdi-nintendo-game-boy", title: 'Игра "Саванна"' },
    { link: "/games/audio-call", icon: "mdi-nintendo-game-boy", title: 'Игра "Аудиовызов"' },
    { link: "/games/sprint", icon: "mdi-nintendo-game-boy", title: 'Игра "Спринт"' },
    { link: "/games/our-game", icon: "mdi-nintendo-game-boy", title: 'Игра "Своя игра"' },
  ],
];

export default {
  data: () => ({
    drawer: null,
    drawerGroups,
  }),
  computed: {
    title() {
      return ` - ${this.$route.meta.title || "эффективное изучение английских слов"}`;
    },
  },
  methods: {
    handleLogout() {
      this.unsetUser();
      this.$router.push("/auth/login");
    },
    ...mapMutations(["unsetUser"]),
  },
};
</script>

<style></style>
