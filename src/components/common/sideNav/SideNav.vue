<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/82.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">Sandra Adams</v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link to="/home">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/team">
          <v-list-item-action>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>О команде</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/stats">
          <v-list-item-action>
            <v-icon>mdi-chart-bar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Статистика</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/vocabulary">
          <v-list-item-action>
            <v-icon>mdi-bookshelf</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Словарь</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/settings">
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Настройки</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link to="/learn">
          <v-list-item-action>
            <v-icon>mdi-alphabetical-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Словарная тренировка</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/games/speak-it">
          <v-list-item-action>
            <v-icon>mdi-nintendo-game-boy</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Игра "SpeakIt"</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/games/english-for-kids">
          <v-list-item-action>
            <v-icon>mdi-nintendo-game-boy</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Игра "English puzzle"</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/games/savana">
          <v-list-item-action>
            <v-icon>mdi-nintendo-game-boy</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Игра "Саванна"</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/games/audio-call">
          <v-list-item-action>
            <v-icon>mdi-nintendo-game-boy</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Игра "Аудиовызов"</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/games/sprint">
          <v-list-item-action>
            <v-icon>mdi-nintendo-game-boy</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Игра "Спринт"</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/games/our-game">
          <v-list-item-action>
            <v-icon>mdi-nintendo-game-boy</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Игра "Своя игра"</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

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

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>RS Lang - изучение</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    drawer: null,
  }),
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
