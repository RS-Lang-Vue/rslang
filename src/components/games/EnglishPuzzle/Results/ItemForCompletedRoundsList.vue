<template>
  <v-list class="completed-cards pa-0">
    <v-list-item
      class="completed-card pa-0 ep-card-height"
      v-for="(card, i) of phrase"
      :key="i"
      :style="({ width: card.width, overflow: card.isLastСard ? 'hidden' : ''})"
    >
      <span class="card-text">{{ card.word }}</span>
      <span
        class="card-bg"
        :class="{ 'first-card': card.isFirstСard }"
        :style="{
          background: `url(${painting.cutSrc}) -${card.bgPosX} -${card.bgPosY}/800px 450px no-repeat`,
        }"
      ></span>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    phrase: {
      type: Array,
      required: true,
    },
    painting: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getHintOptionsEP"]),
    isCardBackground() {
      return this.getHintOptionsEP.showBackground;
    },
  },
};
</script>

<style lang="scss" scoped>
.completed-cards {
  width: 100%;
  display: flex;
  background-color: transparent !important;
  @media (min-width: 851px) {
    background-color: rgba(255, 255, 255, 0.5) !important;
  }
}
.completed-card {
  flex: auto !important;
  align-items: stretch !important;
  box-sizing: border-box;
  min-height: auto;
  justify-content: center;
  font-size: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  box-shadow: inset 2px 2px 2px rgba(154, 147, 140, 0.5), 1px 1px 2px rgba(255, 255, 255, 1);
  @media (min-width: 375px) {
    font-size: 12px;
  }
  @media (min-width: 600px) {
    font-size: 16px;
    box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);
  }
}
.card-text {
  position: relative;
  z-index: 2;
  text-shadow: 1px 1px 5px #000000b2, -1px -1px 5px #000000b2, -1px 1px 5px #000000b2,
    1px -1px 5px #000000b2;
}
.card-bg {
  @media (min-width: 851px) {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: calc(100% + 16px);
    height: 100%;
    z-index: 1;

    background-blend-mode: multiply;
    -webkit-mask-box-image: url("../../../../assets/images/maskForCard.svg") 0 35%;
  }
}
.first-card {
  @media (min-width: 851px) {
    -webkit-mask-box-image: url("../../../../assets/images/maskFirstCard.svg") 0 35%;
  }
}
</style>
