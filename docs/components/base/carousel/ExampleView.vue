<template>
  <div class="container">
    <span class="text">水平轮播（默认）:</span>
    <BaseCarousel>
      <BaseCarouselItem>
        <div class="item item-1">1</div>
      </BaseCarouselItem>
      <BaseCarouselItem>
        <div class="item item-2">2</div>
      </BaseCarouselItem>
      <BaseCarouselItem>
        <div class="item item-3">3</div>
      </BaseCarouselItem>
    </BaseCarousel>
    <span class="text">垂直轮播（自动）:</span>
    <BaseCarousel direction="vertical" dot-position="left" arrow="never" auto-play>
      <BaseCarouselItem>
        <div class="item item-1">1</div>
      </BaseCarouselItem>
      <BaseCarouselItem>
        <div class="item item-2">2</div>
      </BaseCarouselItem>
      <BaseCarouselItem>
        <div class="item item-3">3</div>
      </BaseCarouselItem>
    </BaseCarousel>
  </div>
</template>

<script lang="ts" setup>
import BaseCarousel from '@/SCarousel/index.vue';
import BaseCarouselItem from '@/SCarouselItem/index.vue';
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 400px;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 24px;
  }

  .item-1 {
    background-color: rgb(214, 103, 103);
  }

  .item-2 {
    background-color: rgb(122, 170, 122);
  }

  .item-3 {
    background-color: rgb(200, 171, 5);
  }
}
</style>