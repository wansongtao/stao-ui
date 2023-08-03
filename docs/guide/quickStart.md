# 快速开始

本节将介绍如何在项目中使用组件库`stao-ui`以及工具库 `@stao-ui/utils`.  
::: tip 使用建议
由于本组件库还在开发中，如果您要使用本组件库，建议直接复制要使用的组件源代码或相关函数源代码到你的项目中。
:::

## stao-ui

```vue
<template>
  <STaoButton>按钮</STaoButton>
</template>

<script setup>
import { STaoButton } from '@stao-ui/components'
</script>
```

## @stao-ui/utils

```ts
import { getDataType } from '@stao-ui/utils'

getDataType('string') // string
```
