# Tabs 标签页

标签页组件，用于在不同的内容区域之间进行切换。

::: details 组件源码
<<< ../../../../packages/components/src/BaseTabs/BaseTabs.vue
:::

## 基本用法

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
| name | 名称 | _string_ | 随机字符串 |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 切换标签页时触发 | _modelValue: string_ |
