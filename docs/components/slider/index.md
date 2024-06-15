# Slider 滑块

滑块组件，用于在一个固定区间内进行数值选择。

::: details 组件源码
<<< ../../../packages/components/src/BaseSlider/BaseSlider.vue
:::

## 基础用法

<script lang="ts" setup>
import ExampleView from './ExampleView.vue'
</script>

<ExampleView />

::: details 示例代码
<<< ./ExampleView.vue
:::

## API

### Props

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue(v-model) | 绑定值 | _number_ | `0` |
| min | 最小值 | _number_ | `0` |
| max | 最大值 | _number_ | `100` |
| step | 步长 | _number_ | `1` |
| disabled | 是否禁用 | _boolean_ | `false` |
| showText | 是否显示文本 | _boolean_ | `true` |
| textColor | 文本颜色 | _string_ | `#525252` |
| color | 滑块激活态颜色 | _string_ | `#525252` |
| trackColor | 滑块轨道颜色 | _string_ | `#e5e6eb` |
| strokeWidth | 滑块高度 | _string_ | `6px` |
| width | 滑块宽度 | _string_ | `100%` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 滑块值发生改变时触发 | _value: number_ |
