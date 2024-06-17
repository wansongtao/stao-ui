<script lang="ts" setup>
defineOptions({
  name: 'BaseCarouselItem'
})
</script>

<template>
  <div class="base-carousel-item"><slot /></div>
</template>

<style lang="scss" scoped>
.base-carousel-item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}
</style>