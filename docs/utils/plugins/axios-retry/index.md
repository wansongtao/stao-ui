# Axios retry 请求重试插件

`axios-retry` 是一个用于`axios`的请求重试插件，用于在请求失败时自动重试请求。支持自定义重试规则。

::: details 实现源码
<<< ../../../../packages/utils/src/plugins/axios-retry.ts
:::

## 基本用法

### 简单用法

先创建插件实例，然后将插件实例的拦截器方法注册到 axios 拦截器中即可。

```ts
import axios from 'axios';
import createAxiosRetryPlugin from '...';

const instance = axios.create();

const retry = createAxiosRetryPlugin({ request: instance.request });
instance.interceptors.response.use(
  undefined,
  retry.responseInterceptorRejected
);
```

### 高级用法

可以通过传入配置项来定制插件的行为。

```ts
import axios, type { AxiosError, AxiosResponse } from 'axios'
import createAxiosRetryPlugin from '...'

const instance = axios.create()

const retry = createAxiosRetryPlugin({
  request: instance.request,
  maxRetryCount: 3,
  retryDelay: 1000,
  isRetry: (error?: AxiosError, res?: AxiosResponse) => {
    return error?.response?.status !== 401 && res?.data.statusCode !== 401
  }
})
instance.interceptors.response.use(
  retry.responseInterceptorFulfilled,
  retry.responseInterceptorRejected
)
```

## 配置项

### `request`

- **类型**：`(config: AxiosRequestConfig) => Promise<AxiosResponse>`
- **默认值**：`undefined`
- **说明**：重试请求方法，建议传入`axios` 实例的 `request` 方法
- **必填**：是

### `maxRetryCount`

- **类型**：`number`
- **默认值**：`3`
- **说明**：最大重试次数
- **必填**：否

### `retryDelay`

- **类型**：`number`
- **默认值**：`1000`
- **说明**：重试延迟时间（毫秒）
- **必填**：否

### `isRetry`

- **类型**：`(error?: AxiosError, res?: AxiosResponse) => boolean`
- **默认值**：`(err) => { if (err) { return true; } return false; }`
- **说明**：是否重试的判断函数
- **必填**：否

### `beforeRetry`

- **类型**：`(retryCount: number, error?: AxiosError, res?: AxiosResponse) => void`
- **默认值**：`undefined`
- **说明**：重试前的回调函数，每次重试前都会调用
- **必填**：否

### `failed`

- **类型**：`(retryCount: number, error?: AxiosError, res?: AxiosResponse) => void`
- **默认值**：`undefined`
- **说明**：重试失败的回调函数，当重试次数达到最大重试次数时调用
- **必填**：否
