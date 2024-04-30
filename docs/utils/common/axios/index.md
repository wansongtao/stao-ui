# axios 封装

> `axios`：基于 Promise 的 HTTP 客户端，用于浏览器和 node.js。  

`axios`通用封装，包含请求拦截器、响应拦截器、重复请求解决方案等。

## 介绍
  
对请求拦截器与响应拦截器进行了通用封装，通过`Event Bus`解决了重复请求问题。 Event Bus实现请[参考](../../plugins/event/index)。  
提供一个对类型/错误处理更友好的`request`方法，返回值`Promise<[err?: AxiosError, data?: T]>`。

::: details axios 封装源码
<<< ../../../../packages/utils/src/request.ts
:::

## 使用示例

定义接口，使用泛型约束返回值类型。

```ts
import instance, { request } from '@/utils/request';


type IResponse<T = unknown> = { code: number; data: T; msg: string };

// 返回值： Promise<[err?: AxiosError, data?: IResponse<{name: string; age: number;}>]>
export const getUserData = () => {
  return request<IResponse<{name: string; age: number;}>>({
    url: '/user',
    method: 'get'
  });
};


// 成功 resolve，失败 reject
export const getTestData = <T = unknown>(
  data: { page: number; pageSize: number }
) => {
  return instance.request<any, IResponse<T>>({
    url: '/test',
    method: 'post',
    data
  });
};
```
