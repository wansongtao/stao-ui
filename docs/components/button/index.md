# Button 按钮

按钮组件，默认跟随父组件宽度，支持同时设置`type`、`status`、`disabled`。

::: details 组件源码
<<< ../../../packages/components/src/BaseButton/BaseButton.vue
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
| type | 类型 | _'primary' \| 'outline'_ | `primary` |
| status | 状态 | _'default' \| 'danger'_ | `default` |
| disabled | 是否禁用 | _boolean_ | `false` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击按钮时触发(禁用时也会触发) | _event: MouseEvent_ |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- | 
| default | 需要显示的内容 | - | 
