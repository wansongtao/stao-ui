<script lang="ts" setup>
withDefaults(
  defineProps<{
    type?: 'cube' | 'circle';
    loading?: boolean;
    showMask?: boolean;
    maskColor?: string;
  }>(),
  {
    type: 'circle',
    loading: false,
    showMask: true,
    maskColor: 'transparent'
  }
);
</script>

<template>
  <div v-show="loading">
    <div v-if="showMask" class="mask"></div>
    <div
      class="loader"
      :class="{
        'loader--cube': type === 'cube',
        'loader--circle': type === 'circle'
      }"></div>
  </div>
</template>

<style lang="scss" scoped>
.mask {
  position: absolute;
  z-index: 998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: v-bind(maskColor);
}

.loader {
  position: absolute;
  z-index: 999;
}

.loader--cube {
  top: calc(50% - 32px);
  left: calc(50% - 24px);
  width: 48px;
  height: 48px;

  &:before {
    content: '';
    width: 48px;
    height: 5px;
    background: rgba($color: #f08080, $alpha: 0.5);
    position: absolute;
    top: 60px;
    left: 0;
    border-radius: 50%;
    animation: shadow 0.5s linear infinite;
  }

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    background: #f08080;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    animation: jump 0.5s linear infinite;
  }

  @keyframes jump {
    15% {
      border-bottom-right-radius: 3px;
    }

    25% {
      transform: translateY(9px) rotate(22.5deg);
    }

    50% {
      transform: translateY(18px) scale(1, 0.9) rotate(45deg);
      border-bottom-right-radius: 40px;
    }

    75% {
      transform: translateY(9px) rotate(67.5deg);
    }

    100% {
      transform: translateY(0) rotate(90deg);
    }
  }

  @keyframes shadow {
    0%,
    100% {
      transform: scale(1, 1);
    }

    50% {
      transform: scale(1.2, 1);
    }
  }
}

.loader--circle {
  top: calc(50% - 18px);
  left: calc(50% - 18px);
  width: 36px;
  height: 36px;
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-left-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
