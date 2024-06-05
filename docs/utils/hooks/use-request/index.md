# useRequest

该 hook 用于处理请求，包括请求的发送、请求的状态、请求的结果等。

::: details 实现源码
<<< ../../../../packages/utils/src/hooks/useRequest.ts
:::

## 介绍

本文 useRequest 可以用来快速创建分页请求。该函数接收三个参数：

- `request` 请求函数，返回值为`Promise<{ data: T[]; total: number }>`；
- `options` 可选参数，包含三个可选属性：
  1. `defaultPageSize` 默认分页大小，默认值为`10`；
  2. `defaultPage` 默认当前页，默认值为`1`；
  3. `immediate` 页码或每页大小变化时是否立即发起请求，默认值为`false`。
- `isShallow` 是否使用`shallowRef`对 data 进行响应式，默认值为`false`。

返回值为一个对象，包含以下属性：

- `list` 请求结果；
- `total` 请求结果总数；
- `page` 当前页码；
- `pageSize` 每页大小；
- `loading` 请求状态；
- `lastPage` 最后一页页码；
- `fetchData` 发起请求函数；

## 使用

```vue
<template>
  <a-table
    class="ant-table-striped"
    :columns="columns"
    :data-source="list"
    :loading="loading">
    ...
  </a-table>

  <a-pagination
    v-model:current="page"
    v-model:page-size="pageSize"
    :total="total" />
</template>

<script setup>
import { useRequest } from 'useRequest.ts';

const columns = [...];
const { page, pageSize, total, loading, list } = useRequest(
  (params: { page: number; pageSize: number; key?: string; }) => {
    return new Promise<{ total: number; data: any[] }>((resolve) => {
      setTimeout(() => {
        resolve({
          data: [],
          total: 0
        })
      }, 1000);
    })
  },
  {
    immediate: true
  }
);
</script>
```
