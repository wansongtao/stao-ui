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

文本超出范围显示省略号，并抛出事件。提供一个默认 slot，用于显示文本，建议只传入 inline/text 元素。  
使用场景：需要获取文本是否超出范围状态，即是否显示了省略号。

::: tip 提示
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。  
:::

::: details 源代码
<<< ../../../packages/components/src/TextEllipsis/index.vue
:::

## 基础用法

点击文本，切换文本内容，查看文本是否超出范围。
<simple-example />

::: details 查看代码
<<< ./simple.vue
:::

## 进阶用法

配合Antd的Tooltip组件，超出范围时，才显示浮层。点击文本，可以切换文本内容。
<advanced-example />

::: details 查看代码
<<< ./advanced.vue
:::
