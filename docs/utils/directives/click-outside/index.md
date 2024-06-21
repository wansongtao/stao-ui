# vClickOutSide

## 介绍

`v-click-outside` 是一个 Vue 指令，用于检测点击元素外部的事件。

::: details 源码
<<< ../../../../packages/utils/src/directives/vClickOutside.ts
:::

## 使用

### 全局注册

```ts
import { createApp } from 'vue';
import { clickOutsideInstall } from '...';  // 引入 clickOutsideInstall
import App from './App.vue';

const app = createApp(App);
clickOutsideInstall(); // 全局注册
app.mount('#app');
```
在组件中使用：
```vue
<template>
  <div v-click-outside="onClickOutside">
    <p>点击外部区域</p>
  </div>
</template>

<script setup>
const onClickOutside = () => {
  console.log('点击外部区域')
}
</script>
```

### 局部注册

::: details 示例代码
<<< ./ExampleView.vue
:::

<script setup lang="ts">
  import ExampleView from './ExampleView.vue'
</script>

<ExampleView />
