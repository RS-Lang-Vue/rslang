<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      class="elevation-2"
      dark
      :centered="true"
      :grow="true"
      :vertical="false"
      :right="false"
      :prev-icon="undefined"
      :next-icon="undefined"
      :icons-and-text="icons"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">
        Tab {{ i }}
        <v-icon v-if="icons">mdi-phone</v-icon>
      </v-tab>

      <v-tab-item v-for="i in tabs" :key="i" :value="'tab-' + i">
        <v-card flat tile>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    Vocabulary page
    {{ cuirrentDifficulty }}
    {{ cuirrentDifficultyCopy }}
    <input v-model="cuirrentDifficulty" />
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: null,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icons: false,
    tabs: 3,
    cuirrentDifficulty: 0,
  }),
  computed: {
    cuirrentDifficultyCopy() {
      return this.cuirrentDifficulty + 1;
    },
  },
};
</script>

<style></style>
