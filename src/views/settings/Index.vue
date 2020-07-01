<template>
  <v-card>
    <v-tabs v-model="tab" background-color="indigo lighten-5" light>
      <v-tab>
        Общие
      </v-tab>
      <v-tab>
        Словарная тренировка
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          Общие настройки
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <learn-settings />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
// eslint-disable-next-line import/extensions
import learnSettings from "@/components/settings/learnSettings";

export default {
  data() {
    return {
      tab: null,
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    "learn-settings": learnSettings,
  },
};
</script>
