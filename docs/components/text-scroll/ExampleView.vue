<script lang="ts" setup>
import { STextScroll } from '@stao-ui/components'

const text = '人生不是梦。若是梦，就怕梦醒了，人老了。人的不幸有千万种，而幸福的人只有一种：心境禅定，爱心无染的人。'
</script>

<template>
  <div class="container">
    <STextScroll :text="text" :speed="6" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  border: 1px solid #999;
}
</style>