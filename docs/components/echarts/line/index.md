<script lang="ts" setup>
import SimpleExample from './simple.vue'
import AdvancedExample from './advanced.vue'
</script>
# LineChart 折线图

封装echarts lineChart组件，设置了一些默认配置仅需传入数据即可使用，元素大小改变自动重新生成图表，也支持自定义配置。具体配置参考[echarts官方文档](https://echarts.apache.org/zh/option.html#title)。
::: tip
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
:::  

::: details 源代码
<<< ../../../../packages/components/src/echarts/LineChart/index.vue
:::

## 基础用法

折线图，传入数据与一些简单配置即可，其他配置使用默认配置。
<SimpleExample />

::: details 查看示例代码
<<< ./simple.vue
:::

## 进阶用法

自定义配置，可以传入任意echarts配置，会和默认配置合并。

<AdvancedExample />

::: details 查看示例代码
<<< ./advanced.vue
:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | x轴与y轴数据 | `{ xAxisData: string[]; series: LineSeriesOption[] }` | - |
| options | 自定义配置，会和默认配置合并 | `EChartOption` | - |
| defaultUnit | 拼接到tooltip里展示的数据后面 | `string` | - |
