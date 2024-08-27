# Axios 封装

Axios 是一个基于 Promise 的 HTTP 客户端，可以用在浏览器和 node.js 环境中。

Axios 简单封装，提供了请求拦截器、响应拦截器、错误处理等功能。还提供了一个额外的`request`请求方法，支持泛型、类型友好、错误优先。

::: details 实现源码
<<< ../../../../packages/utils/src/plugins/request.ts
:::

## 基本用法

### request 方法

对错误处理友好，无需使用`try...catch`或`.catch`获取错误信息。

<<< ./example.ts#example1

### axios 实例

可以调用axios的`instance`实例的方法，如`get`、`post`、`request`等。

<<< ./example.ts#example2
