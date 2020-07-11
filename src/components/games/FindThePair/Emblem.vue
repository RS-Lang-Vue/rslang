<template>
  <svg viewBox="0 0 280 280" class="svg svg--bird">
    <defs>
      <mask id="mask" maskunits="userSpaceOnUse" maskcontentunits="userSpaceOnUse">
        <image
          xlink:href="https://img-fotki.yandex.ru/get/15520/5091629.a4/0_8d416_118079e_orig"
          width="277"
          height="293"
        ></image>
      </mask>

      <linearGradient id="gr-1" x1="0" y1="0" x2="100%" y2="100%">
        <stop offset="15%" class="stop-color stop-color--1" />
        <stop offset="45%" class="stop-color stop-color--2" />
        <stop offset="55%" class="stop-color stop-color--2" />
        <stop offset="85%" class="stop-color stop-color--3" />
      </linearGradient>

      <linearGradient id="gr-2" x1="0" y1="100%" x2="100%" y2="0%">
        <stop offset="15%" class="stop-color stop-color--4" />
        <stop offset="45%" class="stop-color stop-color--5" stop-opacity="0" />
        <stop class="stop-color stop-color--5" stop-opacity="0" />
        <stop offset="85%" class="stop-color stop-color--6" />
      </linearGradient>
    </defs>

    <g mask="url(#mask)" class="g-container">
      <rect fill="url(#gr-1)" width="100%" height="100%"></rect>
      <rect fill="url(#gr-2)" width="100%" height="100%"></rect>
    </g>
  </svg>
</template>

<style lang="scss" scoped>
.svg {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;

  &--rays {
    width: 100%;
    height: 100%;
  }
  &--bird {
    top: -60px;
    left: -30px;
    width: 280px;
    height: 280px;
  }
}

.stop-color {
  stop-color: crimson;
  animation: colors 3s linear infinite;

  &--2 {
    animation-delay: -1s;
  }
  &--3 {
    animation-delay: -0.5s;
  }
  &--4 {
    animation-delay: -2s;
  }
  &--5 {
    animation-delay: -2.5s;
  }
  &--6 {
    animation-delay: -1.5s;
  }
}

@keyframes colors {
  0% {
    stop-color: maroon;
  }
  10% {
    stop-color: crimson;
  }
  20% {
    stop-color: orangered;
  }
  30% {
    stop-color: gold;
  }
  40% {
    stop-color: yellowgreen;
  }
  50% {
    stop-color: skyblue;
  }
  60% {
    stop-color: steelblue;
  }
  70% {
    stop-color: slateblue;
  }
  80% {
    stop-color: darkviolet;
  }
  90% {
    stop-color: purple;
  }
}

.svg--bird {
  animation: up-down 1.68s infinite ease-out;
}

@keyframes up-down {
  50% {
    transform: translate(0, 30px);
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
