<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
import { changeCarousel } from '@stao-ui/utils'

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
    defaultIndex: 0
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
let timer: number | null = null

const autoplayCarousel = () => {
  if (!$props.autoPlay) {
    return
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
  activeIndex.value = $props.defaultIndex
  const element = carouselRef.value!
  total.value = element.children.length
  if (!total.value) {
    return
  }

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
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
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

  $props.beforeChange?.(activeIndex.value, index)

  activeIndex.value = changeIndex(index, total.value, $props.loop)
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
      <slot name="dot" :activeIndex="activeIndex">
        <li v-for="item in total" :key="item">
          <button
            @click="onGoTo(item - 1)"
            class="s-carousel-dot-item"
            :class="{ 's-carousel-dot-item--active': activeIndex === item - 1 }"
          ></button>
        </li>
      </slot>
    </ul>
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
    opacity: 0.8;
  }
}

.s-carousel-dot-item--active {
  opacity: 1;
}
</style>
