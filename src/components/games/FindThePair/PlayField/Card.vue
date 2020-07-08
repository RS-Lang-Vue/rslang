<template>
  <vue-flip
    v-model="flip"
    class="card"
    width="auto"
    height="auto"
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
        style="border-radius: 4px;"
      ></v-img>
      <span v-else class="text-caption text-sm-body-1">{{ card.word }}</span>
    </template>
  </vue-flip>
</template>

<script>
import { mapGetters } from "vuex";
import VueFlip from "vue-flip";

export default {
  components: {
    "vue-flip": VueFlip,
  },
  props: {
    card: {
      type: Object,
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
    };
  },
  computed: {
    ...mapGetters(["getSettingsFP"]),
  },
  watch: {
    isShirtCard() {
      this.flip = this.isShirtCard;
    },
  },
  methods: {
    handleClick(card) {
      if (this.flipAvailable && !this.flip) {
        if (this.getSettingsFP.audio) {
          this.$emit("playAudio", card.audio);
        }
        this.flip = true;
        this.$emit("checkCards", card.id);
      }
    },
  },
};
</script>

<style lang="scss">
.card,
.front,
.back {
  border-radius: 4px;
}
.card {
  opacity: 1 !important;
}
.front {
  width: 100%;
  height: 100%;
  background-image: url("../../../../assets/images/pattern.png");
  background-repeat: repeat;
  background-position: center;
  cursor: pointer;
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
