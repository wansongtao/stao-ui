<script lang="ts" setup>
import GanttChart from '@/GanttChart/GanttChart.vue';

const list = [
  [
    {
      id: 10,
      beginTime: '2025-03-20 06:00',
      endTime: '2025-03-20 10:40',
      style: 'background-color: gray;'
    },
    {
      id: 20,
      beginTime: '2025-03-20 10:40',
      endTime: '2025-03-20 17:50',
      style: 'background-color: yellow;'
    },
    {
      id: 30,
      beginTime: '2025-03-20 17:50',
      endTime: '2025-03-21 08:00',
      style: 'background-color: red;'
    },
    {
      id: 40,
      beginTime: '2025-03-21 08:00',
      endTime: '2025-03-21 12:00',
      style: 'background-color: blue;'
    }
  ],
  [
    {
      id: 1,
      beginTime: '2025-03-20 06:00',
      endTime: '2025-03-20 10:40'
    },
    {
      id: 2,
      beginTime: '2025-03-20 11:30',
      endTime: '2025-03-20 17:50'
    },
    {
      id: 3,
      beginTime: '2025-03-20 18:30',
      endTime: '2025-03-20 22:00'
    },
    {
      id: 4,
      beginTime: '2025-03-21 10:30',
      endTime: '2025-03-21 18:00'
    }
  ]
];
</script>

<template>
  <div class="example-view">
    <gantt-chart
      :data="list"
      :config="{
        height: 200,
        beginDate: '2025-03-20',
        endDate: '2025-03-21'
      }" />
  </div>
</template>

<style lang="scss">
.vp-doc table {
  display: table;
  margin: 0;
}
</style>
