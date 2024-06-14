<template>
  <div class="container">
    <base-tabs :tabs="tabs1" v-model="checkedValue1" />

    <base-tabs name="tabs2" :tabs="tabs2" v-model="checkedValue2" />
  </div>
</template>

<script lang="ts" setup>
import BaseTabs from '@/BaseTabs/BaseTabs.vue';
import { ref } from 'vue';

const tabs1 = ref([
  { label: 'Tab 1', value: 'tab1' },
  { label: 'Tab 2', value: 'tab2' },
  { label: 'Tab 3', value: 'tab3' }
]);
const checkedValue1 = ref('tab1');

const tabs2 = ref([
  { label: '香蕉', value: '1' },
  { label: '苹果', value: '2', dot: 5 },
  { label: '橘子', value: '3' }
]);
const checkedValue2 = ref('2');
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 40px;
}
</style>