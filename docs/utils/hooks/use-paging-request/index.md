# usePagingRequest

::: tip
建议复制源码到自己的项目中使用。
:::

## 介绍

该函数用于快速创建分页请求。接收三个参数，分别是：

- `request`：请求函数，返回值`Promise<{ data: T[]; total: number }>`。
- `options`：可选配置项，有以下属性：
  - `defaultPage`：默认页码，默认值为`1`。
  - `defaultPageSize`：默认每页条数，默认值为`10`。
  - `delay`：请求防抖时间，默认不防抖。
  - `autoWatchPage`：是否在页码与每页条数改变时，自动更新数据。
- `isShallow`：可选，是否使用`shallowRef`对列表数据进行响应式。

返回一个对象，包含以下属性：

- `page`：页码。
- `pageSize`：每页条数。
- `total`：总条数。
- `list`：列表数据。
- `loading`：请求状态。
- `getList`：获取列表数据函数。
- `lastPage`：最后一页。

::: details 查看源码
<<< ../../../../packages/utils/src/hooks/usePagingRequest.ts
:::

## 使用

```vue
<script setup lang="ts">
import { usePagingRequest } from '@stao-ui/utils';

const { list, loading, getList, page, lastPage } = usePagingRequest(fetchData);
const onNext = () => {
  page.value++;
  if (page.value > lastPage.value) {
    page.value = 1;
  }
  getList();
};

function fetchData(params: { page: number; pageSize: number }) {
  return new Promise<{ data: { id: number; name: string }[]; total: number }>(
    (resolve) => {
      setTimeout(() => {
        resolve({
          data: Array.from({ length: params.pageSize }).map((_, index) => ({
            id: index + 1 + (params.page - 1) * params.pageSize,
            name: `name${index + 1 + (params.page - 1) * params.pageSize}`
          })),
          total: 100
        });
      }, 1000);
    }
  );
}
</script>
<template>
  <div>
    <div v-if="loading">加载中...</div>
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.name }}</li>
    </ul>
    <button @click="onNext">下一页</button>
  </div>
</template>
```
