<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useResizeObserver } from '@stao-ui/utils';

const $props = withDefaults(
  defineProps<{
    gap?: string;
    duration?: number;
    direction?: 'vertical' | 'horizontal';
    timingFunction?: string;
    animateDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  }>(),
  {
    gap: '20px',
    duration: 6,
    direction: 'horizontal',
    timingFunction: 'linear',
    animateDirection: 'normal'
  }
);

const animateDuration = computed(() => `${$props.duration}s`);
const translate3d = computed(() => {
  if ($props.direction === 'vertical') {
    return `translate3d(0, calc(-100% - ${$props.gap}), 0)`;
  }
  return `translate3d(calc(-100% - ${$props.gap}), 0, 0)`;
});

const isScroll = ref(false);
const { element } = useResizeObserver(() => {
  const parent = element.value.parentElement!;
  if ($props.direction === 'vertical') {
    isScroll.value = element.value.scrollHeight > parent.clientHeight;
    return;
  }
  isScroll.value = element.value.scrollWidth > parent.clientWidth;
});
</script>

<template>
  <div
    class="scroll-list"
    :class="{ 'scroll-list--vertical': direction === 'vertical' }">
    <div ref="element" class="scroll-list__item" :class="{ animate: isScroll }">
      <slot />
    </div>
    <div v-if="isScroll" class="scroll-list__item animate">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll-list {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  gap: v-bind(gap);

  &__item {
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: v-bind(gap);
  }

  &:hover .animate {
    animation-play-state: paused;
  }
}

.scroll-list--vertical {
  flex-direction: column;
  height: 100%;

  .scroll-list__item {
    flex-direction: column;
  }
}

.animate {
  animation: marquee v-bind(animateDuration) v-bind(timingFunction) infinite;
  animation-direction: v-bind(animateDirection);
}

@keyframes marquee {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: v-bind(translate3d);
  }
}
</style>
