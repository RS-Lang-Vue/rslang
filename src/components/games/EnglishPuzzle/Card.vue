<template>
  <v-card
    outlined
    dark
    :height="HEIGHT_CARD"
    class="rounded-0 card border"
    v-on:click="onClick"
    ref="card"
    :width="cardWidth"
    :style="
      isCardBackground
        ? {
            background: `url(${painting.cutSrc}) -${cardBgPosX} -${cardBgPosY}/800px 450px no-repeat rgba(0,0,0,0.2)`,
          }
        : ''
    "
    :class="{
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
          item.width = `${this.$refs.card.$el.offsetWidth}px`;
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
  border-color: rgba(255, 255, 255, 0.12) !important;
}

.card {
  box-sizing: border-box;
  border: 1px solid #00000033;
  background-blend-mode: multiply;

  font-size: 10px;
  line-height: 45px;
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
}
</style>
