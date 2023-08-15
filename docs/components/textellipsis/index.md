<script setup>
import simpleExample from './simple.vue';
import advancedExample from './advanced.vue';
</script>
<style scoped>
details {
  cursor: pointer;
}
</style>

# 文本省略组件

获取文本是否超出了宽度显示了省略号。  
***使用场景：配合tooltip组件，显示了省略号才显示提示框。***

::: tip 提示
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。  
:::

::: details 组件源代码
<<< ../../../packages/components/src/TextEllipsis/index.vue
:::

::: details useTextEllipsis 源码
<<< ../../../packages/utils/src/hooks/useTextEllipsis.ts
:::

## 基础用法

点击文本，切换文本内容，查看文本是否超出范围。
<simple-example />

::: details 查看示例代码
<<< ./simple.vue
:::

## 进阶用法

配合Antd的Tooltip组件，超出范围时，才显示浮层。点击文本，可以切换文本内容。
<advanced-example />

::: details 查看示例代码
<<< ./advanced.vue
:::

## API

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| changeStatus | 是否超出范围状态改变时触发 | `(isOverflow: boolean) => void` |

### Slots

| 名称 | 说明 | 参数 | 
| --- | --- | --- |
| default | 默认插槽，用于显示文本，建议只传入 inline/text 元素 | `{ isOverflow: boolean }` |
