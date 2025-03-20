<template>
  <div
    class="scroll-list"
    :style="style"
    :class="{ 'scroll-list--vertical': direction === 'vertical' }"
  >
    <div ref="element" class="scroll-list__item" :class="{ animate: isScroll }">
      <slot />
    </div>
    <div v-if="isScroll" class="scroll-list__item animate">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      validator: function(value) {
        return ['horizontal', 'vertical'].includes(value)
      },
      default: 'horizontal'
    },
    gap: {
      type: String,
      default: '20px'
    },
    speed: { // px/s
      type: Number,
      default: 40
    }
  },
  data() {
    return {
      isScroll: false,
      resizeObserver: null,
      duration: '6s'
    }
  },
  computed: {
    style() {
      let style = `--scroll-gap: ${this.gap};--scroll-duration: ${this.duration};`
      if (this.direction === 'vertical') {
        style += `--scroll-translate3d: translate3d(0, calc(-100% - ${this.gap}), 0);`
      } else {
        style += `--scroll-translate3d: translate3d(calc(-100% - ${this.gap}), 0, 0);`
      }

      return style
    }
  },
  created() {
    this.resizeObserver = new ResizeObserver(() => {
      const element = this.$refs.element
      const parent = element.parentElement
      if (this.direction === 'vertical') {
        this.isScroll = element.scrollHeight > parent.clientHeight
        if (this.isScroll) {
          this.duration = (element.scrollHeight / this.speed).toFixed(2) + 's'
        }
        return
      }

      this.isScroll = element.scrollWidth > parent.clientWidth
      if (this.isScroll) {
        this.duration = (element.scrollWidth / this.speed).toFixed(2) + 's'
      }
    })
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.resizeObserver.disconnect()
    this.resizeObserver = null
  },
  methods: {
    init() {
      const element = this.$refs.element
      if (!element) {
        return
      }

      this.resizeObserver.observe(element)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-list {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  gap: var(--scroll-gap, 20px);

  &__item {
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: var(--scroll-gap, 20px);
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
  animation: marquee var(--scroll-duration) linear infinite;
}

@keyframes marquee {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: var(--scroll-translate3d);
  }
}
</style>
