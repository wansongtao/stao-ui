# Axios-deplicator

axios 请求去重插件，用于防止重复请求，可无缝集成到axios中。支持自定义请求去重规则。

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
