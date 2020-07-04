<template>
  <vue-flip
    v-model="flip"
    class="card"
    width="auto"
    height="19.9%"
    style="background-color: transparent;"
    :class="{ invisible: deletedCard }"
  >
    <template v-slot:front class="front" v-if="!deletedCard">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
        "
        @click="handleClick(card)"
      ></div>
    </template>
    <template v-slot:back class="back" :class="{ invisible: deletedCard }">
      <v-img
        v-if="card.cardImg"
        :src="card.image"
        height="100%"
        width="auto"
        max-height="100%"
      ></v-img>
      <span v-else>{{ card.word }}</span>
    </template>
  </vue-flip>
</template>

<script>
import VueFlip from "vue-flip";
import AudioControl from "@/helpers/audio-control";

export default {
  components: {
    "vue-flip": VueFlip,
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
    isAutoPlay: {
      type: Boolean,
      required: true,
    },
    flipAvailable: {
      type: Boolean,
      required: true,
    },
    deletedCard: {
      type: Boolean,
      required: true,
    },
    isShirtCard: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      flip: false,
      audio: {},
    };
  },
  watch: {
    isShirtCard() {
      if (this.isShirtCard) this.flip = false;
    },
  },
  mounted() {
    this.audio = new AudioControl();
  },
  methods: {
    handleClick(card) {
      if (this.flipAvailable) {
        if (this.isAutoPlay) {
          this.audio.stop();
          this.audio.play(card.audio);
        }
        this.flip = true;
        this.$emit("checkCards", card.id);
      }
    },
  },
};
</script>

<style lang="scss">
.front {
  /* background-color: #673ab7; */
  width: 100%;
  height: 100%;
  --rlist: var(--c) 0 3px, transparent 0 7px;
  --dim: 100% 50% no-repeat;
  --ang: 90deg;
  overflow: hidden;
  position: relative;
  border-radius: 7px;
  box-shadow: 2px 2px 17px #000;
  background: repeating-linear-gradient(var(--ang-0, -45deg), var(--rlist)) var(--pos-0, 0 0) /
      var(--dim),
    repeating-linear-gradient(var(--ang-1, 45deg), var(--rlist)) var(--pos-1, 0 100%) / var(--dim),
    linear-gradient(var(--ang), var(--nlist));
  --c: #228f8a;
  --nlist: #2b9c96, #90e1e2;
}
.back {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffc107;
  color: white;
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss" scoped>
.card {
  flex-basis: 24.9%;
  cursor: pointer;
}
</style>
