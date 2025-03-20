<template>
  <div class="container">
    默认样式：
    <base-slider v-model="value1" />
    自定义颜色：
    <base-slider v-model="value2" color="#ea3323" track-color="#f3d2d2" text-color="#ea3323" />
    自定义步长：
    <base-slider v-model="value3" :step="5" />
    自定义宽度：
    <base-slider v-model="value4" stroke-width="12px" />
    禁用状态：
    <base-slider v-model="value5" disabled />
  </div>
</template>

<script lang="ts" setup>
import BaseSlider from '@/BaseSlider/BaseSlider.vue';
import { ref } from 'vue';

const value1 = ref(20);
const value2 = ref(30);
const value3 = ref(40);
const value4 = ref(5);
const value5 = ref(64);
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>