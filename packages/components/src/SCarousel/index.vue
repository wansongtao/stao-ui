<script lang="ts" setup>
import { onMounted, ref, onScopeDispose, watch } from 'vue'
import { changeCarousel } from '@stao-ui/utils'
import IconArrowLeft from '../icons/IconArrowLeft.vue'
import IconArrowRight from '../icons/IconArrowRight.vue'

defineOptions({
  name: 'SCarousel'
})

const $props = withDefaults(
  defineProps<{
    direction?: 'horizontal' | 'vertical'
    autoPlay?: boolean
    interval?: number
    loop?: boolean
    dotPosition?: 'top' | 'bottom' | 'left' | 'right'
    showDot?: boolean
    duration?: number
    easing?: string
    defaultIndex?: number
    arrow?: 'always' | 'hover' | 'never'
    beforeChange?: (from: number, to: number) => void
    afterChange?: (current: number) => void
  }>(),
  {
    direction: 'horizontal',
    autoPlay: false,
    interval: 3000,
    loop: true,
    dotPosition: 'bottom',
    showDot: true,
    duration: 500,
    easing: 'ease',
    defaultIndex: 0,
    arrow: 'hover'
  }
)

const changeIndex = (index: number, total: number, loop = true) => {
  if (index < 0) {
    return loop ? total - 1 : 0
  } else if (index > total - 1) {
    return loop ? 0 : total - 1
  } else {
    return index
  }
}

const activeIndex = ref<number>(0)
const total = ref<number>(0)
const carouselRef = ref<HTMLElement>()

let timer: NodeJS.Timer | null = null
onScopeDispose(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const autoplayCarousel = () => {
  if (!$props.autoPlay) {
    return
  }
  if (timer) {
    clearInterval(timer)
  }

  timer = setInterval(() => {
    const idx = changeIndex(activeIndex.value + 1, total.value, $props.loop)
    $props.beforeChange?.(activeIndex.value, idx)
    // stop autoplay, when index is not changed
    if (idx === activeIndex.value) {
      clearInterval(timer!)
      return
    }
    activeIndex.value = idx

    changeCarousel({
      index: activeIndex.value,
      ele: carouselRef.value!,
      timingFunc: $props.easing,
      duration: $props.duration,
      direction: $props.direction,
      afterChange: $props.afterChange
    })
  }, $props.interval)
}
const init = () => {
  const element = carouselRef.value
  if (!element) {
    return
  }

  total.value = element.children.length
  if (!total.value) {
    return
  }

  activeIndex.value = $props.defaultIndex
  // set default index
  if (activeIndex.value) {
    changeCarousel({
      index: activeIndex.value,
      ele: element,
      duration: 0,
      direction: $props.direction
    })
  }

  autoplayCarousel()
}

onMounted(() => {
  init()
})
watch(
  () => $props,
  () => {
    if (timer) {
      clearInterval(timer)
    }
    init()
  },
  { deep: true }
)

const onGoTo = (index: number) => {
  if (timer) {
    clearInterval(timer)
  }

  const idx = changeIndex(index, total.value, $props.loop)
  $props.beforeChange?.(activeIndex.value, idx)
  activeIndex.value = idx
  changeCarousel({
    index: activeIndex.value,
    ele: carouselRef.value!,
    timingFunc: $props.easing,
    duration: $props.duration,
    direction: $props.direction,
    afterChange: () => {
      $props.afterChange?.(activeIndex.value)
      autoplayCarousel()
    }
  })
}

const onPrev = () => {
  onGoTo(activeIndex.value - 1)
}

const onNext = () => {
  onGoTo(activeIndex.value + 1)
}

defineExpose({
  onGoTo,
  onPrev,
  onNext
})
</script>

<template>
  <div class="s-carousel">
    <div ref="carouselRef" class="s-carousel-wrapper" :class="{ flex: direction === 'horizontal' }">
      <slot />
    </div>
    <ul
      v-if="showDot"
      class="s-carousel-dot"
      :class="{
        's-carousel-dot--bottom s-carousel-dot--h': dotPosition === 'bottom',
        's-carousel-dot--top s-carousel-dot--h': dotPosition === 'top',
        's-carousel-dot--left s-carousel-dot--v': dotPosition === 'left',
        's-carousel-dot--right s-carousel-dot--v': dotPosition === 'right'
      }"
    >
      <li v-for="(item, index) in total" :key="item">
        <slot name="dot" :active="activeIndex === index" :index="index">
          <button
            class="s-carousel-dot-item"
            :class="{ 'dot-item--active': activeIndex === index }"
            @click="onGoTo(index)"
          ></button>
        </slot>
      </li>
    </ul>
    <div
      class="s-arrow s-arrow--left"
      :class="{ 's-arrow--always': arrow === 'always' }"
      v-if="arrow !== 'never'"
    >
      <slot name="arrowLeft">
        <button class="arrow-button" @click="onPrev">
          <IconArrowLeft />
        </button>
      </slot>
    </div>
    <div
      class="s-arrow s-arrow--right"
      :class="{ 's-arrow--always': arrow === 'always' }"
      v-if="arrow !== 'never'"
    >
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

.s-carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  .s-carousel-wrapper {
    height: 100%;
  }

  .s-arrow {
    position: absolute;
    top: 50%;
    opacity: 0;
    transform: translateY(-50%);
    transition: all 0.3s ease;

    &.s-arrow--always {
      opacity: 1;
    }
  }

  &:hover .s-arrow {
    opacity: 1;
  }
}

.s-arrow--left {
  left: 15px;
}

.s-arrow--right {
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

.s-carousel-dot {
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

.s-carousel-dot--h {
  left: 50%;
  transform: translateX(-50%);
}

.s-carousel-dot--v {
  flex-direction: column;
  top: 50%;
  transform: translateY(-50%);
}

.s-carousel-dot--top {
  top: 15px;
}

.s-carousel-dot--bottom {
  bottom: 15px;
}

.s-carousel-dot--left {
  left: 15px;
}

.s-carousel-dot--right {
  right: 15px;
}

.s-carousel-dot-item {
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
