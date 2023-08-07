<script setup lang="ts">
  import SimpleExample from './index.vue';
  import AdvancedExample from './advanced.vue';
</script>
# useTextEllipsis

获取文本是否溢出状态，即是否显示了省略号。  
***使用场景：文本溢出了才显示提示框。例如：文本超出范围显示了省略号，鼠标移入显示完整文本提示框，如果没有显示省略号则鼠标移入不显示提示框。***

::: details 源码
<<< ../../../../packages/utils/src/hooks/useTextEllipsis.ts
:::

## 基础用法
获取文本渲染后，是否超出范围且显示了省略号。

<SimpleExample />

::: details 查看示例源码
<<< ./index.vue
:::

## 进阶用法
渲染动态文本，判断是否溢出。点击文本，切换内容。

<AdvancedExample />

::: details 查看示例源码
<<< ./advanced.vue
:::
