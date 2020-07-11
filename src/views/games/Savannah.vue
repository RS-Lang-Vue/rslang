<template>
  <div class="savannah">
    <div class="bg-image"></div>
    <Main v-if="!startPage" :startPage="startPage" @changeStartPage="startPage = true" />
    <div class="intro__wrapper" v-else>
      <v-card color="transparent" class="intro" elevation="0">
        <v-card-title class="intro__title">Savannah</v-card-title>
        <v-card-text class="intro__decription"
          >Успейте выбрать правильный перевод, до того, как падающее слово пересечет черту
        </v-card-text>
        <v-card-actions class="intro__actions">
          <v-btn @click="startPage = false">
            Начать
          </v-btn>
        </v-card-actions>
      </v-card>
      <Settings />
    </div>
  </div>
</template>

<script>
import Main from "@/components/games/Savannah/Main.vue";
import Settings from "@/components/games/Savannah/Settings.vue";

export default {
  data() {
    return {
      startPage: true,
    };
  },
  components: {
    Main,
    Settings,
  },
};
</script>


<style lang="scss">
.savannah {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 89vh;
  position: fixed;
}
.bg-image {
  width: 120vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: url("../../../src/assets/images/savannah/savannah-bg.jpg");
}
.intro__wrapper {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.intro {
  width: 100vw;

  .intro__title {
    justify-content: center;
    color: #ffffff;
    font-size: 40px;
  }
  .intro__decription {
    color: #ffffff !important;
    font-size: 20px;
  }
  .intro__actions {
    justify-content: center;
  }
}
</style>
