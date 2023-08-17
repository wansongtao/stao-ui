<script lang="ts" setup>
import type { EChartsOption, PieSeriesOption } from 'echarts';
import { ref, type Ref } from 'vue';
import { SPieChart } from '@stao-ui/components';

const data = ref<PieSeriesOption['data']>([
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
]);

const getTotal = (data: PieSeriesOption['data']) => {
  let total = 0;
  data?.forEach((item: any) => {
    total += item.value;
  });
  return total.toFixed(2);
};

const option: Ref<EChartsOption> = ref({
  title: {
    text: '总支出(元)',
    subtext: getTotal(data.value)
  },
  series: [
    {
      percentPrecision: 2
    }
  ]
});

const onChange = () => {
  data.value = [
    {
      name: '投资',
      value: Math.floor(Math.random() * 1000)
    },
    {
      name: '消费',
      value: Math.floor(Math.random() * 1000)
    },
    {
      name: '生活费',
      value: Math.floor(Math.random() * 1000)
    },
    {
      name: '其他',
      value: Math.floor(Math.random() * 1000)
    }
  ];

  option.value = {
    title: {
      subtext: getTotal(data.value)
    }
  };
};
</script>

<template>
  <button class="btn" @click="onChange">改变配置</button>
  <div class="box">
    <SPieChart :data="data" :options="option" />
  </div>
</template>

<style lang="scss" scoped>
.btn {
  padding: 2px 6px;
  border: 1px dotted #ea6637;
}
.box {
  width: 100%;
  height: 300px;
}
</style>
