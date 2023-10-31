# Event Bus 事件总线

## 介绍

Event Bus 是一个基于发布订阅者模式的事件总线，用于解决跨组件通信的问题。

::: details 查看源码
<<< ../../../packages/utils/src/event/eventBus.ts
:::

## 使用

### 安装

```bash
pnpm i @stao-ui/utils
```

### 引入

```js
import { EventBus } from '@stao-ui/utils';

export default new EventBus();
```

### vue3 中使用

```vue
<script setup>
import eventBus from './eventBus.ts';

const emitEvent = () => {
  // 发送事件
  eventBus.$emit('event', 'hello world');
};

const onEvent = () => {
  // 接收事件
  eventBus.$on('event', (data) => {
    console.log(data);
  });
};

const removeEvent = () => {
  // 移除事件
  eventBus.$off('event');
};
</script>
```

## 示例

<script setup>
import simpleExample from './simpleExample.vue';
</script>

<simple-example />

::: details 事件总线代码
<<< ./eventBus.ts
:::

::: details 发送事件组件代码
<<< ./component/ButtonEmit.vue{4,8}
:::

::: details 接收事件组件代码
<<< ./component/ButtonReceive.vue{4,10,12}
:::
