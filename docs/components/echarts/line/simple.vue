<script lang="ts" setup>
import { SLineChart } from '@stao-ui/components'

const data = {
  xAxisData: [
    '2023-08-01',
    '2023-08-02',
    '2023-08-03',
    '2023-08-04',
    '2023-08-05',
    '2023-08-06',
    '2023-08-07'
  ],
  series: [
    {
      name: '收入',
      data: [1000, 2200, 800, 1400, 500, 1600, 1700]
    }
  ]
}
</script>

<template>
  <div class="box">
    <SLineChart :data="data" defaultUnit="元" />
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 200px;
}
</style>