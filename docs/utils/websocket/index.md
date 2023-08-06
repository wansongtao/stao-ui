# WebSocket 封装

使用`Promise`封装`WebSocket`，使其更加易用。

## 创建 WebSocket

```ts
import { createWebSocket } from '@stao-ui/utils';

createWebSocket('ws://localhost:8080')
  .then((ws) => {
    // ...
  })
  .catch((err) => {
    // ...
  });
```

::: details 点击查看代码
<<< ../../../packages/utils/src/webSocket.ts#createWebSocket
:::

## 接收消息

```ts
import { createWebSocket, onMessageWebSocket } from '@stao-ui/utils';

createWebSocket('ws://localhost:8080')
  .then((ws) => {
    // 接收消息并打印
    onMessageWebSocket<string>(ws).then((res) => {
      console.log(res.data);
    });
  })
  .catch((err) => {
    // ...
  });
```

::: details 点击查看代码
<<< ../../../packages/utils/src/webSocket.ts#onMessageWebSocket
:::

## 发送消息

```ts
import { createWebSocket, sendMessageWebSocket } from '@stao-ui/utils';

createWebSocket('ws://localhost:8080')
  .then((ws) => {
    // 发送消息
    sendMessageWebSocket(ws, 'message');
  })
  .catch((err) => {
    // ...
  });
```

::: details 点击查看代码
<<< ../../../packages/utils/src/webSocket.ts#sendMessageWebSocket
:::

## 监听 WebSocket 关闭

```ts
import { createWebSocket, onCloseWebSocket } from '@stao-ui/utils';

createWebSocket('ws://localhost:8080')
  .then((ws) => {
    // 监听 WebSocket 关闭
    onCloseWebSocket(ws).then((res) => {
      console.log(res.code);
      console.log(res.reason);
    });
  })
  .catch((err) => {
    // ...
  });
```
::: details 点击查看代码
<<< ../../../packages/utils/src/webSocket.ts#onCloseWebSocket
:::
