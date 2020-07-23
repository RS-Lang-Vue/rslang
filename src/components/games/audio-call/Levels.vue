<template>
  <div class="levels fill-height">
    <h2 class="levels__title">Выберите уровень сложности слов!</h2>
    <div class="levels__buttons">
      <v-btn
        v-for="level in levels"
        :key="level.id"
        color="success"
        fab
        x-large
        class="mx-5"
        :disabled="level.id > goneLevels"
        @click.prevent="startGame(level)"
        v-text="level.val"
      ></v-btn>
    </div>
    <br />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {},
  data() {
    return {
      levels: [
        { id: 0, val: 1 },
        { id: 1, val: 2 },
        { id: 2, val: 3 },
        { id: 3, val: 4 },
        { id: 4, val: 5 },
        { id: 5, val: 6 },
      ],
    };
  },
  computed: {
    ...mapGetters({
      isGameStarted: "GET_IS_AUDIO_CALL_STARTED",
      currentLevel: "GET_AUDIO_CALL_CURRENT_LEVEL",
      goneLevels: "GET_AUDIO_CALL_GONE_LEVEL",
    }),
  },
  methods: {
    ...mapActions({
      fetchWords: "fetchWords",
    }),
    async startGame(level) {
      try {
        this.$store.commit("SET_IS_AUDIO_CALL_PAGE_LOADING", true);
        this.$store.commit("SET_AUDIO_CALL_CURRENT_LEVEL", level.id);
        await this.fetchWords({ group: level.id, page: 0 });
      } catch (error) {
        /* console.log(error); */
      } finally {
        this.$store.commit("SET_IS_AUDIO_CALL_STARTED", true);
        this.$store.commit("SET_IS_AUDIO_CALL_PAGE_LOADING", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.levels {
  display: flex;
  flex-direction: column;
  justify-content: center;
  &__title {
    margin-bottom: 2rem;
    color: #444;
  }
  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
