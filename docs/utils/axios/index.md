# axios 封装

封装一个 axios 请求实例，统一处理请求和响应，统一处理错误，统一处理 loading 等等。

::: details axios 封装
<<< ../../../packages/utils/src/request.ts
:::
::: details store
<<< ../../../packages/utils/src/store/user.ts
:::

## 使用

定义接口，使用泛型约束返回值类型。

```ts
import instance from '@/utils/request';

type IParams = any;
type IResponse<T = unknown> = { code: number; data: T; msg: string };

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
