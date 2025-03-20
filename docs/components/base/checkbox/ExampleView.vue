<template>
  <div class="container">
    水平布局：
    <base-checkbox v-model="checkedValue" :data />
    垂直布局：
    <base-checkbox v-model="checkedValue2" :data layout="vertical" name="checkbox-1" />
  </div>
</template>

<script lang="ts" setup>
import BaseCheckbox from '@/BaseCheckbox/BaseCheckbox.vue';
import { ref } from 'vue';

const data = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3', disabled: true }
];
const checkedValue = ref<string[]>([]);
const checkedValue2 = ref<string[]>(['2']);
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 24px;
}
</style>