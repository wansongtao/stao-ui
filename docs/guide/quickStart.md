# 快速开始

`stao-ui`主要包含了，工作中常用的vue2/3组件、常用的js/ts方法、常用的css与一些通用工具封装等。

::: tip 建议
建议您直接复制相关组件源代码或相关函数源代码到您的项目中。这样可以避免因为组件库还在开发中而导致的不稳定性，也可以根据您的需求进行自定义。而且后续主要将采用headless的方式进行开发，所以这个组件库的更新频率会比较低。
:::

## 引入 stao-ui

### 安装

```bash
# NPM
$ npm install @stao-ui/components @stao-ui/utils --save

# Yarn
$ yarn add @stao-ui/components @stao-ui/utils

# pnpm
$ pnpm install @stao-ui/components @stao-ui/utils
```

### 注册

#### 全局部分注册

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { STaoButton } from '@stao-ui/components'

const app = createApp(App)
app.use(STaoButton)
// app.component('STaoButton', STaoButton) // 或者这样注册
app.mount('#app')
```

#### 局部组册组件

```vue
<template>
  <STaoButton>按钮</STaoButton>
</template>

<script setup>
import { STaoButton } from '@stao-ui/components'
</script>
```

#### 注册工具函数

```ts
import { getDataType } from '@stao-ui/utils'

getDataType('string') // string
```

## 按需引入

暂不支持按需引入，后续会转向`headless`风格。
