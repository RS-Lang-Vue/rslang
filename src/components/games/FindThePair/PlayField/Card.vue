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
      >
        <span class="text-caption text-sm-body-1">{{ card.word }}</span>
      </div>
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
      if (this.flipAvailable && !this.flip) {
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
  width: 100%;
  height: 100%;
  background-image: url("../../../../assets/images/pattern.png");
  background-repeat: repeat;
  background-position: center;
}
.back {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #36096d;
  background-image: linear-gradient(315deg, #36096d 0%, #37d5d6 74%);
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
