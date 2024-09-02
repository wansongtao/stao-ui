# Axios deplicator

`axios` 请求去重插件，用于防止重复请求，可无缝集成到`axios`中。支持自定义请求去重规则。

::: details 实现源码
<<< ../../../../packages/utils/src/plugins/axios-deduplicator.ts
:::

## 基本用法

### 简单用法

先创建插件实例，然后将插件实例的拦截器方法注册到axios实例中即可。

```ts
import axios from 'axios'
import createAxiosDeduplicatorPlugin from '...'

const instance = axios.create()

const deduplicator = createAxiosDeduplicatorPlugin()
instance.interceptors.request.use(deduplicator.requestInterceptor)
instance.interceptors.response.use(
  deduplicator.responseInterceptorFulfilled,
  deduplicator.responseInterceptorRejected
)
```

### 高级用法

可以通过传入配置项来定制插件的行为。

```ts
import axios from 'axios'
import createAxiosDeduplicatorPlugin from '...'

const instance = axios.create()

const deduplicator = createAxiosDeduplicatorPlugin({
  generateRequestKey: (config) => config.url,
  isAllowRepeat: (config: AxiosRequestConfig & IConfigHeader) => {
    return config.headers?.isAllowRepetition === true
  },
  deleteCurrentHistory: (error?: AxiosError) => error?.response?.status === 401,
  timeout: 6000,
})
instance.interceptors.request.use(deduplicator.requestInterceptor)
instance.interceptors.response.use(
  deduplicator.responseInterceptorFulfilled,
  deduplicator.responseInterceptorRejected
)
```

## 配置项

### `isAllowRepeat`

- **类型**：`(config: AxiosRequestConfig) => boolean`
- **默认值**：`undefined`
- **说明**：是否允许重复请求，返回`true`表示允许重复请求，返回`false`表示不允许重复请求
- **必填**：否

### `generateRequestKey`

- **类型**：`(config: AxiosRequestConfig) => string`
- **默认值**：一个根据请求参数、请求方法、请求url生成唯一标识的函数
- **说明**：生成请求唯一标识的函数
- **必填**：否

### `deleteCurrentHistory`

- **类型**：`(error?: AxiosError, res?: AxiosResponse) => boolean`
- **默认值**：`undefined`
- **说明**：是否删除当前请求历史，返回`true`表示删除当前请求历史，返回`false`表示不删除当前请求历史。可以根据请求响应结果来决定是否删除当前请求历史，例如：token失效时删除当前请求历史
- **必填**：否

### `timeout`

- **类型**：`number`
- **默认值**：`undefined`
- **说明**：请求超时时间（毫秒）
- **必填**：否
