<template>
  <v-card
    outlined
    dark
    class="rounded-0 card border ep-card-height"
    v-on:click="onClick"
    ref="card"
    :width="cardWidth"
    :style="(card.isLastСard ? { overflow: 'hidden' } : '')"
    :class="{
      'flex-grow-1': growOne,
      'opacity-card': visibility,
      'card-error': error,
      'card-success': success,
      disabled: isPhraseCollected,
    }"
  >
    <span class="card-text">{{ card.word }}</span>
    <span
      class="card-bg"
      :class="{ 'first-card': card.isFirstСard }"
      :style="
        isCardBackground
          ? {
              background: `url(${painting.cutSrc}) -${cardBgPosX} -${cardBgPosY}/800px 450px no-repeat`,
            }
          : { background: `#3f51b5` }
      "
    ></span>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
    isPhraseCollected: {
      type: Boolean,
    },
    painting: {
      type: Object,
    },
    currentPhraseNumber: {
      type: Number,
    },
  },
  data() {
    return {
      growOne: false,
      isUpdate: false,
      HEIGHT_CARD: 45,
      visibility: false,
    };
  },
  computed: {
    ...mapGetters(["getSourceCardsEP", "getSettingsEP"]),
    error() {
      return this.card.isCheck && this.card.isError;
    },
    success() {
      return this.card.isCheck && !this.card.isError;
    },
    cardWidth() {
      return (this.isUpdate && !this.isPhraseCollected) || !this.card.init ? this.card.width : "";
    },
    cardBgPosX() {
      return (this.isUpdate && !this.isPhraseCollected) || !this.card.init
        ? this.card.bgPosX
        : "0px";
    },
    cardBgPosY() {
      return (this.isUpdate && !this.isPhraseCollected) || !this.card.init
        ? this.card.bgPosY
        : "0px";
    },
    isCardBackground() {
      return this.getSettingsEP.hints.showBackground || this.isPhraseCollected;
    },
  },
  methods: {
    ...mapActions(["setSourceCardsEP"]),
    onClick() {
      if (!this.isPhraseCollected) this.$emit("transferCard", this.card.id);
    },
    setSizesCard() {
      this.isUpdate = true;
      const bgPosY = this.currentPhraseNumber * this.HEIGHT_CARD;
      const newCards = this.getSourceCardsEP.map((el) => {
        const item = el;
        if (item.id === this.card.id) {
          const parentWidth = this.$refs.card.$parent.$parent.$el.offsetWidth;
          const widthCard = (this.$refs.card.$el.offsetWidth / parentWidth) * 100;
          item.width = `${widthCard}%`;
          item.init = false;
          item.bgPosX = `${this.$refs.card.$el.offsetLeft}px`;
          item.bgPosY = `${bgPosY}px`;
        }
        return item;
      });
      this.setSourceCardsEP(newCards);
      this.growOne = false;
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.card.init) this.growOne = true;
      this.visibility = true;
    });
  },
  updated() {
    this.$nextTick(() => {
      if (this.card.init && !this.card.isResults) this.setSizesCard();
    });
  },
};
</script>

<style lang="scss" scoped>
.opacity-card {
  opacity: 1 !important;
}
.card {
  position: relative;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  background: transparent;
  opacity: 0;
  transition: opacity 0.1s linear;
  box-shadow: inset 2px 2px 2px rgba(154, 147, 140, 0.5), 1px 1px 2px rgba(255, 255, 255, 1);
  font-size: 10px;
  text-align: center;
  cursor: pointer;
  &.disabled {
    cursor: auto;
    opacity: 1;
  }
  @media (min-width: 375px) {
    font-size: 12px;
  }
  @media (min-width: 600px) {
    font-size: 16px;
    box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);
  }
  @media (max-width: 850px) {
    background: #3f51b5 !important;
  }
}
.card-text {
  position: relative;
  z-index: 2;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5), -1px -1px 5px rgba(0, 0, 0, 0.5),
    -1px 1px 5px rgba(0, 0, 0, 0.5), 1px -1px 5px rgba(0, 0, 0, 0.5);
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
    -webkit-mask-box-image: url("../../../assets/images/maskForCard.svg") 0 35%;
  }
}
.first-card {
  @media (min-width: 851px) {
    -webkit-mask-box-image: url("../../../assets/images/maskFirstCard.svg") 0 35%;
  }
}
.card-error {
  box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px white, 0 5px 0 #ff5252;
}
.card-success {
  box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px white, 0 5px 0 #4caf50;
}
</style>
