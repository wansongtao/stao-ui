# Radio 单选框

单选框组件，用于在多个备选项中选中单个状态。

::: details 组件源码
<<< ../../../../packages/components/src/BaseRadio/BaseRadio.vue
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
| modelValue(v-model) | 绑定值 | _string_ | - |
| name | 单选组名称 | _string_ | 随机字符串 |
| data | 备选项 | _{ label: string, value: string, disabled?: boolean }[]_ | - |
| layout | 布局方式 | _'horizontal'\|'vertical'_ | `horizontal` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 选中值发生改变时触发 | _value: string_ |
