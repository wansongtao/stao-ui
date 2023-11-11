<script setup>
import SimpleExample from './simpleExample.vue'
</script>

# CheckTransfer 多选穿梭框

左边显示分组多选列表，右边显示已选中的列表。类似穿梭框组件，但左边已选中的项不会消失。

::: tip 提示
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
:::

::: details 源代码
<<< ../../../../packages/components/src/antDesign/STransfer/index.vue
:::

## 基础用法

<SimpleExample />

::: details 查看示例代码
<<< ./simpleExample.vue
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| requestFn | 获取可选项的请求函数 | _() => Promise<ITransferItem[]>_ | - |
| colSpan | 列宽度 | _number_ | `6` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| changeCheck | 选中项发生变化 | _(value: number[]) => void_ |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- | 
| default | 左边可选项目 | _value: {id: number; name: string;}_ |
| checked | 右边已选项目 | _value: {id: number; name: string;}_ |
| delete | 删除图标 | - |
