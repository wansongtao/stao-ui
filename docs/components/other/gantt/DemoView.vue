<script lang="ts" setup>
import GanttChart, { type IGanttChartItem } from '@/GanttChart/GanttChart.vue';

import { ref } from 'vue';

interface DataItem extends IGanttChartItem {
  id: number;
  leftText?: string;
  rightText?: string;
  title?: string;
}

const list = ref<DataItem[][]>([
  [
    {
      id: 10,
      beginTime: '2025-03-20 06:00',
      endTime: '2025-03-20 10:40',
      style: 'background-color: gray;',
      mode: 'row'
    },
    {
      id: 10,
      beginTime: '2025-03-20 10:40',
      endTime: '2025-03-20 17:50',
      style: 'background-color: yellow;',
      mode: 'row'
    },
    {
      id: 10,
      beginTime: '2025-03-20 17:50',
      endTime: '2025-03-21 08:00',
      style: 'background-color: red;',
      mode: 'row'
    },
    {
      id: 10,
      beginTime: '2025-03-21 08:00',
      endTime: '2025-03-21 12:00',
      style: 'background-color: blue;',
      mode: 'row'
    }
  ],
  [
    {
      id: 1,
      beginTime: '2025-03-20 06:00',
      endTime: '2025-03-20 10:40',
      leftText: 'left',
      title: 'center',
      rightText: 'right'
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
]);

const checked = ref([1, 3]);
</script>

<template>
  <div class="demo-view">
    <gantt-chart
      v-model:checked="checked"
      :data="list"
      :config="{
        height: 200,
        beginDate: '2025-03-20',
        endDate: '2025-03-21'
      }"
      can-select>
      <template #row-icon="{ data }">
        <i v-if="data.mode === 'row'">🤣</i>
      </template>
      <template #default="{ data }">
        <div class="flex">
          <div>{{ data?.leftText }}</div>
          <div>{{ data?.title }}</div>
          <div>{{ data.rightText }}</div>
        </div>
      </template>
      <template #context-menu>
        <div>右键菜单</div>
      </template>
    </gantt-chart>
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 5px;
  width: 100%;
  box-sizing: border-box;
}
</style>
