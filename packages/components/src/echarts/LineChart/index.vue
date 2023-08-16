<script lang="ts" setup>
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import type { EChartsOption, LineSeriesOption } from 'echarts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { ref, onMounted, watch } from 'vue';

defineOptions({
  name: 'SLineChart'
})

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

const $props = defineProps<{
  units?: string;
  data?: {
    xAxisData: string[];
    series: LineSeriesOption[];
  };
  options?: EChartsOption;
}>();

const option: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#fefeff' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#dbefff' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        opacity: 0.6
      }
    },
    padding: 8,
    valueFormatter: (value) => {
      return value + ($props.units ?? '');
    }
  },
  legend: {
    icon: 'circle',
    left: 'right',
    textStyle: {
      color: '#666666'
    }
  },
  grid: {
    top: 30,
    bottom: 20,
    left: '8%',
    right: 0
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#f5f6f9',
        type: 'dashed'
      }
    },
    axisLine: {
      onZero: false,
      lineStyle: {
        color: '#f5f6f9'
      }
    },
    axisLabel: {
      color: '#999999'
    },
    data: $props.data?.xAxisData ?? []
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#f5f6f9',
        type: 'dashed'
      }
    },
    axisLabel: {
      color: '#999999'
      // formatter: '{value} ￥'
    }
  },
  series: [
    {
      name: $props.data?.series[0].name ?? '',
      type: 'line',
      smooth: true,
      emphasis: {
        focus: 'series'
      },
      data: $props.data?.series[0].data ?? []
    },
    {
      name: $props.data?.series[1].name ?? '',
      type: 'line',
      smooth: true,
      emphasis: {
        focus: 'series'
      },
      data: $props.data?.series[1].data ?? []
    }
  ]
};

const lineChartRef = ref<HTMLElement | null>(null);
let myChart: echarts.ECharts | null = null;
onMounted(() => {
  if (!lineChartRef.value) {
    return;
  }

  myChart = echarts.init(lineChartRef.value);
  if (!$props.options) {
    myChart.setOption(option);
  } else {
    myChart.setOption({ ...option, ...$props.options });
  }

  const resizeObserver = new ResizeObserver(() => {
    myChart?.resize();
  });
  resizeObserver.observe(lineChartRef.value);
});

watch(
  () => $props.data,
  (data) => {
    if (!myChart || !data) {
      return;
    }

    myChart.setOption({
      xAxis: {
        data: data.xAxisData
      },
      series: data.series
    });
  },
  {
    deep: true
  }
);
</script>

<template>
  <div ref="lineChartRef" class="chart"></div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
