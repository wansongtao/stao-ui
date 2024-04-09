# Event Bus 事件总线

## 介绍

Event Bus 是一个基于发布订阅者模式实现的事件总线，TS 友好，提供了`$emit`、`$on`、`$off`、`clear`四个方法。

**_使用场景：跨组件通信、解决 axios 重复请求问题等。_**

::: tip
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
:::  

::: details 查看源码
<<< ../../../packages/utils/src/event/eventBus.ts
:::

## 使用

### 安装

```bash
pnpm i @stao-ui/utils
```

### 引入

```ts
import { EventBus } from '@stao-ui/utils';

export default new EventBus<{
  event(data: string): void;
}>();
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
