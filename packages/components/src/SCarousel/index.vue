<script lang="ts" setup>
import { onMounted, ref, onScopeDispose, watch } from 'vue';
import { changeCarousel, throttle } from '@stao-ui/utils';
import IconArrowLeft from '../icons/IconArrowLeft.vue';
import IconArrowRight from '../icons/IconArrowRight.vue';

defineOptions({
  name: 'BaseCarousel'
});

const $props = withDefaults(
  defineProps<{
    direction?: 'horizontal' | 'vertical';
    autoPlay?: boolean;
    interval?: number;
    duration?: number;
    initialIndex?: number;
    loop?: boolean;
    dotPosition?: 'top' | 'bottom' | 'left' | 'right';
    showDot?: boolean;
    easing?: string;
    arrow?: 'always' | 'hover' | 'never';
    beforeChange?: (from: number, to: number) => void;
    afterChange?: (current: number) => void;
  }>(),
  {
    direction: 'horizontal',
    autoPlay: false,
    interval: 3000,
    loop: true,
    dotPosition: 'bottom',
    showDot: true,
    duration: 300,
    easing: 'ease',
    initialIndex: 0,
    arrow: 'hover'
  }
);

const changeIndex = (index: number, total: number, loop = true) => {
  if (index < 0) {
    return loop ? total - 1 : 0;
  } else if (index > total - 1) {
    return loop ? 0 : total - 1;
  } else {
    return index;
  }
};

let timer: NodeJS.Timer | null = null;
onScopeDispose(() => {
  timer && clearInterval(timer);
});

const activeIndex = ref<number>(0);
const total = ref<number>(0);
const carouselRef = ref<HTMLElement>();
const autoplayCarousel = () => {
  if (!$props.autoPlay) {
    return;
  }
  timer && clearInterval(timer);

  timer = setInterval(() => {
    const idx = changeIndex(activeIndex.value + 1, total.value, $props.loop);
    $props.beforeChange?.(activeIndex.value, idx);
    // stop autoplay, when index is not changed
    if (idx === activeIndex.value) {
      clearInterval(timer!);
      return;
    }
    activeIndex.value = idx;

    changeCarousel({
      index: activeIndex.value,
      el: carouselRef.value!,
      timingFunc: $props.easing,
      duration: $props.duration,
      direction: $props.direction,
      afterChange: $props.afterChange
    });
  }, $props.interval);
};
const init = () => {
  const element = carouselRef.value;
  if (!element) {
    return;
  }

  total.value = element.children.length;
  if (!total.value) {
    return;
  }

  activeIndex.value = $props.initialIndex;
  // set default index
  if (activeIndex.value) {
    changeCarousel({
      index: activeIndex.value,
      el: element,
      duration: 0,
      direction: $props.direction
    });
  }

  autoplayCarousel();
};

onMounted(() => {
  init();
});
watch(
  () => $props,
  () => {
    timer && clearInterval(timer);
    init();
  },
  { deep: true }
);

const onGoTo = throttle<number>((index: number) => {
  timer && clearInterval(timer);

  const idx = changeIndex(index, total.value, $props.loop);
  $props.beforeChange?.(activeIndex.value, idx);
  activeIndex.value = idx;
  changeCarousel({
    index: activeIndex.value,
    el: carouselRef.value!,
    timingFunc: $props.easing,
    duration: $props.duration,
    direction: $props.direction,
    afterChange: () => {
      $props.afterChange?.(activeIndex.value);
      autoplayCarousel();
    }
  });
}, $props.duration);

const onPrev = () => {
  onGoTo(activeIndex.value - 1);
};

const onNext = () => {
  onGoTo(activeIndex.value + 1);
};

defineExpose({
  onGoTo,
  onPrev,
  onNext
});
</script>

<template>
  <div class="base-carousel">
    <div
      ref="carouselRef"
      class="base-carousel-wrapper"
      :class="{ flex: direction === 'horizontal' }">
      <slot />
    </div>
    <ul
      v-if="showDot"
      class="base-carousel-dot"
      :class="{
        'base-carousel-dot--bottom base-carousel-dot--h': dotPosition === 'bottom',
        'base-carousel-dot--top base-carousel-dot--h': dotPosition === 'top',
        'base-carousel-dot--left base-carousel-dot--v': dotPosition === 'left',
        'base-carousel-dot--right base-carousel-dot--v': dotPosition === 'right'
      }">
      <li v-for="(item, index) in total" :key="item">
        <slot name="dot" :active="activeIndex === index" :index="index">
          <button
            class="base-carousel-dot-item"
            :class="{ 'dot-item--active': activeIndex === index }"
            @click="onGoTo(index)"></button>
        </slot>
      </li>
    </ul>
    <div
      class="base-arrow base-arrow--left"
      :class="{ 'base-arrow--always': arrow === 'always' }"
      v-if="arrow !== 'never'">
      <slot name="arrowLeft">
        <button class="arrow-button" @click="onPrev">
          <IconArrowLeft />
        </button>
      </slot>
    </div>
    <div
      class="base-arrow base-arrow--right"
      :class="{ 'base-arrow--always': arrow === 'always' }"
      v-if="arrow !== 'never'">
      <slot name="arrowRight">
        <button class="arrow-button" @click="onNext">
          <IconArrowRight />
        </button>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.base-carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  .base-carousel-wrapper {
    height: 100%;
  }

  .base-arrow {
    position: absolute;
    top: 50%;
    opacity: 0;
    transform: translateY(-50%);
    transition: all 0.3s ease;

    &.base-arrow--always {
      opacity: 1;
    }
  }

  &:hover .base-arrow {
    opacity: 1;
  }
}

.base-arrow--left {
  left: 15px;
}

.base-arrow--right {
  right: 15px;
}

.arrow-button--none {
  opacity: 0;
}

.arrow-button {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.6);
  }
}

.base-carousel-dot {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  z-index: 9;
  list-style: none;

  li {
    margin: 0;
    padding: 0;
  }
}

.base-carousel-dot--h {
  left: 50%;
  transform: translateX(-50%);
}

.base-carousel-dot--v {
  flex-direction: column;
  top: 50%;
  transform: translateY(-50%);
}

.base-carousel-dot--top {
  top: 15px;
}

.base-carousel-dot--bottom {
  bottom: 15px;
}

.base-carousel-dot--left {
  left: 15px;
}

.base-carousel-dot--right {
  right: 15px;
}

.base-carousel-dot-item {
  all: unset;
  display: block;
  opacity: 0.3;
  width: 8px;
  height: 8px;
  margin: 4px;
  border-radius: 50%;
  background-color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover,
  &:focus {
    opacity: 0.7;
  }

  &.dot-item--active {
    opacity: 1;

    &:hover,
    &:focus {
      opacity: 1;
    }
  }
}
</style>
