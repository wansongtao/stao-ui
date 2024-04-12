<script setup lang="ts">
  import ExampleView from './example.vue';
</script>
# useTextEllipsis

::: tip
建议复制源码到自己的项目中使用。
:::  

## 介绍

用于获取文本是否溢出。该函数接收一个布尔值参数，用于控制是否自动检测文本溢出状态。该函数只适用于使用`inline`元素渲染文本。  
***使用场景：文本溢出了才显示提示框。[参考](../../../components/textellipsis/index#进阶用法)***

::: details 查看源码
<<< ../../../../packages/utils/src/hooks/useTextEllipsis.ts
:::


## 使用

点击文本，可以改变文本内容。

<ExampleView />

::: details 查看示例源码
<<< ./example.vue
:::
