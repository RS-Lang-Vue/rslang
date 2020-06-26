<template>
  <v-card
    outlined
    dark
    height="45"
    color="cyan darken-2"
    class="rounded-0 card border"
    v-on:click="onClick"
    ref="card"
    :width="cardWidth"
    :class="{
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
  },
  data() {
    return {
      growOne: false,
      isUpdate: false,
    };
  },
  computed: {
    error() {
      return this.card.isCheck && this.card.isError;
    },
    success() {
      return this.card.isCheck && !this.card.isError;
    },
    cardWidth() {
      return (this.isUpdate && !this.isPhraseCollected) || !this.card.init ? this.card.width : "";
    },
  },
  methods: {
    onClick() {
      if (!this.isPhraseCollected) this.$emit("transferCard", this.card.id);
    },
    calculateСardWidth() {
      this.isUpdate = true;
      const options = {
        id: this.card.id,
        width: `${this.$refs.card.$el.offsetWidth}px`,
        init: false,
      };
      this.$emit("setWidthCard", options);
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
      if (this.card.init && !this.card.isResults) this.calculateСardWidth();
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
