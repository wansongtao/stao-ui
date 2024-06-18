<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useResizeObserver } from '@stao-ui/utils';

const $props = withDefaults(
  defineProps<{
    gap?: string;
    speed?: number; // px/s
    direction?: 'vertical' | 'horizontal';
    timingFunction?: string;
    animateDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  }>(),
  {
    gap: '20px',
    speed: 50,
    direction: 'horizontal',
    timingFunction: 'linear',
    animateDirection: 'normal'
  }
);

const translate3d = computed(() => {
  if ($props.direction === 'vertical') {
    return `translate3d(0, calc(-100% - ${$props.gap}), 0)`;
  }
  return `translate3d(calc(-100% - ${$props.gap}), 0, 0)`;
});

const isScroll = ref(false);
const { element } = useResizeObserver<HTMLDivElement>(() => {
  isScroll.value = canScroll(element.value, $props.direction);
  initDuration();
});

watch(
  () => $props.speed,
  () => {
    initDuration();
  }
);

const duration = ref('0s');
function initDuration() {
  if (!isScroll.value) {
    return;
  }

  const distance =
    $props.direction === 'vertical'
      ? element.value.scrollHeight
      : element.value.scrollWidth;
  duration.value = (distance / $props.speed).toFixed(1) + 's';
}

function canScroll(element: HTMLElement, direction: 'vertical' | 'horizontal') {
  const parent = element.parentElement!;
  if (direction === 'vertical') {
    return element.scrollHeight > parent.clientHeight;
  }
  return element.scrollWidth > parent.clientWidth;
}
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
  animation: marquee v-bind(duration) v-bind(timingFunction) infinite;
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
