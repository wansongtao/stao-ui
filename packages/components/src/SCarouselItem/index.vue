<script lang="ts" setup>
defineOptions({
  name: 'SCarouselItem'
})
</script>

<template>
  <div class="s-carousel-item"><slot /></div>
</template>

<style lang="scss" scoped>
.s-carousel-item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}
</style>