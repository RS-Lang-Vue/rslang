<template>
  <div class="audio-call">
    <Levels />
    <GameModal v-if="isGameStarted" />
    <Preloader v-if="isAudioCallPageLoading" />
  </div>
</template>

<script>
import Levels from "@/components/games/audio-call/Levels.vue";
import GameModal from "@/components/games/audio-call/GameModal.vue";
import Preloader from "@/components/games/audio-call/Preloader.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    Levels,
    GameModal,
    Preloader,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isAudioCallPageLoading: "GET_IS_AUDIO_CALL_PAGE_LOADING",
      isGameStarted: "GET_IS_AUDIO_CALL_STARTED",
    }),
  },
};
</script>

<style lang="scss" scoped>
.audio-call {
  position: relative;
  height: calc(100vh - 148px);
}
</style>
