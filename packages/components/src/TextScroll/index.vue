<script lang="ts" setup>
import { ref, onMounted, onScopeDispose, watch, nextTick } from 'vue'

defineOptions({
  name: 'TextScroll'
})
const $props = defineProps<{
  text?: string
  speed?: number
}>()

let timerStart: NodeJS.Timeout | null = null
let timerReset: NodeJS.Timeout | null = null
const clearTimer = () => {
  if (timerStart) {
    clearTimeout(timerStart)
    timerStart = null
  }
  if (timerReset) {
    clearTimeout(timerReset)
    timerReset = null
  }
}
onScopeDispose(() => {
  clearTimer()
})

const autoScroll = (element: HTMLElement, width: number, speed = 4) => {
  clearTimer()

  const duration = width * speed
  element.setAttribute(
    'style',
    `transition: transform ${duration}ms linear 0s;transform: translate3d(-${width / 2}px, 0, 0)`
  )

  timerReset = setTimeout(() => {
    element.setAttribute('style', '')
    element.children[0].setAttribute('style', '')
  }, duration)

  // 不多加点时间延时开始，无法实现无缝滚动效果
  timerStart = setTimeout(() => {
    autoScroll(element, width, speed)
  }, duration + 10)
}

const parentEle = ref<HTMLElement | null>(null)
const initScroll = () => {
  if (!$props.text || $props.speed === 0) return

  const parent = parentEle.value
  if (!parent) return
  const scrollWidth = parent.scrollWidth
  const clientWidth = parent.clientWidth
  if (scrollWidth <= clientWidth) {
    return
  }

  const child = parent.children[0] as HTMLElement
  child.appendChild(child.children[0].cloneNode(true))
  nextTick(() => {
    autoScroll(child, scrollWidth * 2, $props.speed)
  })
}
onMounted(initScroll)

watch(
  [() => $props.text, () => $props.speed],
  () => {
    const parent = parentEle.value
    if (!parent) return
    
    const child = parent.children[0] as HTMLElement
    if (child.children.length > 1) {
      clearTimer()
      child.removeChild(child.children[1])
      child.setAttribute('style', '')
      child.children[0].setAttribute('style', '')
    }

    nextTick(() => {
      initScroll()
    })
  }
)
</script>

<template>
  <div ref="parentEle" class="scroll_text">
    <span>
      <span>{{ text }}</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.scroll_text {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;

  span {
    display: inline-block;
  }
}
</style>
