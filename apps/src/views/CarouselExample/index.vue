<script lang="ts" setup>
import { SCarousel, SCarouselItem } from '@stao-ui/components'

defineOptions({
  name: 'CarouselExample'
})
</script>

<template>
  <div class="container">
    <SCarousel auto-play :interval="5000">
      <SCarouselItem>
        <div class="item" style="background-color: rgb(67, 149, 149)">1</div>
      </SCarouselItem>
      <SCarouselItem>
        <div class="item" style="background-color: rgb(177, 209, 229)">2</div>
      </SCarouselItem>
      <SCarouselItem>
        <div class="item" style="background-color: rgb(230, 179, 117)">3</div>
      </SCarouselItem>
      <SCarouselItem>
        <div class="item" style="background-color: rgb(198, 118, 174)">4</div>
      </SCarouselItem>
    </SCarousel>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-top: 100px;
  width: 400px;
  height: 200px;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
}
</style>
