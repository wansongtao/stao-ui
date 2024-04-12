# useResizeObserver

::: tip
建议复制源码到自己的项目中使用。
:::  

## 介绍

用于监听元素的大小变化，返回一个`ResizeObserver`实例和一个`element`对象。该函数接收两个参数：`callback`和`options`。`callback`是一个回调函数，当元素大小变化时会调用。`options`是一个配置对象，可以设置`box`属性，用于指定测量元素的盒模型。默认值为`content-box`。

> `ResizeObserver API`相比于`window.resize`事件有更好的性能、更多的使用场景。[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)。  

***使用场景：在后台系统中，侧边菜单栏收缩/展开时，主体内容的echarts图表需要调整大小。***

::: details 查看源码
<<< ../../../../packages/utils/src/hooks/useResizeObserver.ts
:::

## 使用

```vue
<script setup lang="ts">
import { useResizeObserver } from '@stao-ui/utils';

const { element } = useResizeObserver(() => {
  // 元素大小变化时调用
});
</script>
<template>
  <div ref="element">element</div>
</template>
```
