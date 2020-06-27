<template>
  <v-card
    outlined
    dark
    class="rounded-0 card border ep-card-height"
    v-on:click="onClick"
    ref="card"
    :width="cardWidth"
    :style="
      isCardBackground
        ? {
            background: `url(${painting.cutSrc}) -${cardBgPosX} -${cardBgPosY}/800px 450px no-repeat rgba(0,0,0,0.3)`,
          }
        : ''
    "
    :class="{
      'opacity-card': visibility,
      cyan: !isCardBackground,
      'darken-2': !isCardBackground,
      error: error,
      success: success,
      disabled: isPhraseCollected,
      'flex-grow-1': growOne || isPhraseCollected,
    }"
  >
    {{ card.word }}
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
    ...mapGetters(["getSourceCardsEP", "getHintOptionsEP"]),
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
      return this.getHintOptionsEP.showBackground || this.isPhraseCollected;
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
.cyan.border {
  border: none !important;
}

.opacity-card {
  opacity: 1 !important;
}

.card {
  box-sizing: border-box;
  border: none !important;
  background-blend-mode: multiply;
  opacity: 0;
  transition: opacity 0.3s linear;
  box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);

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
  }
  @media (max-width: 824px) {
    background: #0097a7 !important;
  }
}
</style>
