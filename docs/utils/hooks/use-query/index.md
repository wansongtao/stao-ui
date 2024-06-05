# useURLQuery

该函数允许您轻松地获取和设置URL查询参数，在响应式数据变化时，自动更新查询参数，在查询参数变化时，自动更新响应式数据。

> 为什么不使用`vueuse`的useRouteQuery？因为vueuse的useRouteQuery会在query变化时，会更新整个网站使用useRouteQuery定义的变量(spa)。而useURLQuery只会更新当前页面组件的变量。

::: details 实现源码
<<< ../../../../packages/utils/src/hooks/useURLQuery.ts
:::

## 介绍

本文 useURLQuery 是基于`vue-router`的`useRoute`实现的，因此可以在任何需要获取和设置URL查询参数的地方使用。  
该函数接收三个参数：
- `name` 字符串类型，查询参数的名称；
- `defaultValue` 可选参数，任意类型，查询参数的默认值；
- `options` 可选参数，对象类型，包含`transform`、`mode`、`isEncodeURIComponent`三个可选属性：
  1. `transform` 转换函数，用于转换查询值的类型；
  2. `mode` 路由模式，可选值`push`与`replace`，用于控制查询参数的更新方式；
  3. `isEncodeURIComponent` 布尔类型，是否对查询参数进行编码。

## 使用

```vue
<template>
  <input v-model="name" />
</template>

<script setup>
import { useURLQuery } from 'useURLQuery.ts'

// 获取查询参数name，如果没有则使用默认值default
// 当name变化时，会自动更新查询参数，例如：http://localhost:8080/?name=xxx
const name = useURLQuery('name', 'default')
</script>
```
