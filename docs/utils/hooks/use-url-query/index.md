# useURLQuery

::: tip
建议复制源码到自己的项目中使用。
:::  

## 介绍

该函数允许您轻松地获取和设置URL查询参数。接收三个参数：`name`、`defaultValue`和`options`。`name`是一个字符串，用于设置查询参数名称。`defaultValue`用于设置查询参数默认值。`options`是一个对象，有以下属性：
  - `transform`一个值转换函数，用于将查询参数值转换为其他类型。
  - `mode`一个字符串，用于设置路由模式。有两个值：`replace`和`push`。默认值为`push`。
  - `isEncodeURIComponent`一个布尔值，用于设置是否对查询参数值进行编码。默认值为`false`。  

函数返回一个`ref`值，对相应URL查询参数进行了响应式处理。

::: details 查看源码
<<< ../../../../packages/utils/src/hooks/useURLQuery.ts
:::

## 使用

```vue
<script setup lang="ts">
import { useURLQuery } from '@stao-ui/utils';

const query = useURLQuery('name', '0', {
  transform: (value) => Number(value),
  mode: 'replace',
  isEncodeURIComponent: true
});
</script>
<template>
  <div>
    <input v-model="query.value" />
  </div>
</template>
```
