# useResizeObserver

使用`ResizeObserver API`监听元素的大小变化，相比于`window.resize`事件有更好的性能。官方文档：[ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)。  
***使用场景：配合echarts使用，在渲染元素大小改变时，重新生成echarts图表。改变字体大小等。***

::: details 源码
<<< ../../../../packages/utils/src/hooks/useResizeObserver.ts
:::

## 基础用法

```vue
<script setup lang="ts">
import { useResizeObserver } from '@stao-ui/utils';

const { element } = useResizeObserver(() => {
  // do something
});
</script>
<template>
  <div ref="element">element</div>
</template>
```

## 进阶用法

```vue
<script setup lang="ts">
import { useResizeObserver } from '@stao-ui/utils';
import { ref, onMounted } from 'vue';

const { element, resizeObserver } = useResizeObserver<HTMLDivElement>(() => {
  // do something
}, { box: "border-box" });

// 监听子元素变化
const child = ref<HTMLDivElement | null>(null);
onMounted(() => {
  resizeObserver.observe(child.value);
});
</script>
<template>
  <div ref="element">
    element
    <div ref="child">child</div>
  </div>
</template>
```
