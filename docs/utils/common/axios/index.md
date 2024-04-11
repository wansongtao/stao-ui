# axios

`axios` 实例请求、响应拦截器通用封装。

## 介绍
  
支持设置请求是否携带token。  
支持重复请求，如果存在重复请求，只会向服务器发出第一个请求，其余的请求会等待第一个请求的响应结果，然后返回。  
提供`request`方法，泛型友好、错误处理友好，该函数返回格式`Promise<[data?: IResponse<T>, error?: AxiosError]>`。

::: details axios 封装实现
<<< ../../../../packages/utils/src/request.ts
:::

::: details EventBus 实现
<<< ../../../../packages/utils/src/event/eventBus.ts
:::

## 使用

定义接口，使用泛型约束返回值类型。

```ts
import instance, { request } from '@/utils/request';


type IResponse<T = unknown> = { code: number; data: T; msg: string };

// 返回值类型： Promise<[result?: IResponse<{name: string; age: number;}>, error?: AxiosError]>
export const getUserData = (signal?: AbortSignal) => {
  return request<IResponse<{name: string; age: number;}>>({
    url: '/user',
    method: 'get',
    signal
  });
};

// 成功 resolve，失败 reject
type IParams = { page: number; pageSize: number };
export const getTestData = <T = unknown>(
  data: IParams,
  signal?: AbortSignal
) => {
  return instance.request<any, IResponse<T>>({
    url: '/test',
    method: 'post',
    data,
    signal
  });
};
```

调用接口，使用 `AbortController` 控制请求。

```ts
import { getTestData } from '@/api/test';

let controller: AbortController;
const requestData = () => {
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();

  getTestData({}, controller.signal).then((res) => {
    // ...
  });
};
```
