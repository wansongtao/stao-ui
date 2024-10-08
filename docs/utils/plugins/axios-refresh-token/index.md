# Axios refresh token

`axios`刷新`token`插件，支持自动刷新`token`，且刷新成功后自动重新发起请求并返回结果。可无缝集成到`axios`中。

::: details 实现源码
<<< ../../../../packages/utils/src/plugins/axios-refresh-token.ts
:::

## 基本用法

### 简单用法

先创建插件实例，然后传入刷新token方法与axios实例请求方法，最后将插件实例的拦截器方法注册到axios中即可。

```ts
import axios from 'axios'
import createRefreshTokenPlugin from '...'

const instance = axios.create()

const twinTokenPlugin = createRefreshTokenPlugin(async () => {
  // 获取 token 逻辑
  const token = getRefreshToken()
  if (!token) {
    return false
  }

  // 刷新 token 逻辑
  const [, res] = await refreshToken(token)
  if (!res) {
    return false
  }
  // 保存 token 逻辑
  saveToken(res.data.token, res.data.refreshToken)

  return true
}, instance.request)

// 注册拦截器
instance.interceptors.request.use(twinTokenPlugin.requestInterceptor)
instance.interceptors.response.use(undefined, twinTokenPlugin.responseInterceptorRejected)
```

### 自定义何时刷新

可以通过第三个参数传入一个函数，该函数接收两个参数，第一个参数为AxiosError实例，第二个参数为Response数据，可以根据这两个参数来自定义何时刷新。

```ts
import axios from 'axios'
import createRefreshTokenPlugin from '...'

const instance = axios.create()

const twinTokenPlugin = createRefreshTokenPlugin(async () => {
  // todo: 获取新 token 逻辑

  return true
}, instance.request, (error, response) => {
  // 自定义何时刷新 token
  if (error?.response?.status === 401) {
    return true
  }

  if (response?.data?.code === 401) {
    return true
  }

  return false
})

// 注册拦截器
instance.interceptors.request.use(twinTokenPlugin.requestInterceptor)
instance.interceptors.response.use(twinTokenPlugin.responseInterceptorFulfilled, twinTokenPlugin.responseInterceptorRejected)
```

## 配置项

### `refreshToken`

- **类型**：`() => Promise<boolean>`
- **默认值**：`undefined`
- **说明**：刷新 token 的方法
- **必填**：是

### `request`

- **类型**：`(config: AxiosRequestConfig) => Promise<AxiosResponse>`
- **默认值**：`undefined`
- **说明**：刷新token成功后，重新请求方法。建议传入`axios` 实例的 `request` 方法
- **必填**：是

### `isRefreshToken`

- **类型**：`(error?: AxiosError, response?: AxiosResponse) => boolean`
- **默认值**：`(error, res) => {if (error) {return error.response?.status === 401;}if (res) {return res.data?.code === 401;}return false;}`
- **说明**：判断是否需要刷新 token 的方法
- **必填**：否
