<script lang="ts" setup>
import { SPieChart } from '@stao-ui/components';

const data = [
  {
    name: '投资',
    value: 335
  },
  {
    name: '消费',
    value: 310
  },
  {
    name: '生活费',
    value: 234
  },
  {
    name: '其他',
    value: 135
  }
];
</script>

<template>
  <div class="box">
    <SPieChart
      :data="data"
      :options="{ series: [{ radius: ['', '70%'] }], center: ['0', '0'] }" />
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 200px;
}
</style>
