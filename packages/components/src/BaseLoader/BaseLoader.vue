<script lang="ts" setup>
defineProps<{
  type?: 'cube' | 'circle';
}>();
</script>

<template>
  <div
    :class="{
      'loader--cube': type === 'cube',
      'loader--circle': type === 'circle' || !type
    }"></div>
</template>

<style lang="scss" scoped>
.loader--cube {
  width: 48px;
  height: 48px;
  position: relative;

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
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: transparent;
  width: 36px;
  height: 36px;
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
