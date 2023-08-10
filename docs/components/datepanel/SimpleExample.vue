<script lang="ts" setup>
import { SDatePanel } from '@stao-ui/components';
import { ref } from 'vue';

const date = ref('请点击上面的面板选择日期范围');
const onChangeDate = (dates: { startDate: string; endDate: string }) => {
  date.value = `${dates.startDate} ~ ${dates.endDate}`;
};
</script>

<template>
  <SDatePanel @change-date="onChangeDate" />
  <div class="text">日期范围：<span>{{ date }}</span></div>
</template>

<style lang="scss" scoped>
.text {
  margin-top: 20px;
  margin-left: 15px;

  span {
    color: #e6a23c;
  }
}
</style>