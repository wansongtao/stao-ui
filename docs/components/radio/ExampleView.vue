<template>
  <div class="container">
    水平布局：
    <base-radio v-model="checkedValue" :data="data" />
    垂直布局：
    <base-radio v-model="checkedValue2" name="radio-1" :data="data" layout="vertical" />
  </div>
</template>

<script lang="ts" setup>
import BaseRadio from '@/BaseRadio/BaseRadio.vue';
import { ref } from 'vue';

const data = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3', disabled: true }
];
const checkedValue = ref('1');
const checkedValue2 = ref('1');
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 20px;
}
</style>
