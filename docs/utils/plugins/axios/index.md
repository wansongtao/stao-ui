# Axios

Axios 通用封装，内置重复请求解决方案，在上一个请求还未响应时，再发送一个同样的请求，会等待上一个请求的响应结果，不会再向服务器发送该请求(通过发布订阅者模式实现[EventBus](../../common/event-bus/index))。  
提供了请求拦截器、响应拦截器、错误处理等功能。还提供了一个额外的`request`请求方法，支持泛型、类型友好、错误优先。

::: details 实现源码
<<< ../../../../packages/utils/src/plugins/request.ts
:::

## 基本用法

### request 方法

对错误处理友好，不用使用`try catch`或`.catch`获取错误信息，直接使用`await`或`.then`即可。

<<< ./example.ts#example1

### instance 实例

可以调用`instance`实例的方法，如`get`、`post`、`request`等。

<<< ./example.ts#example2
