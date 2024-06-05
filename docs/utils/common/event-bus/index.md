# EventBus 事件总线

EventBus 是一个事件总线，常用于组件间通信。在 Vue.js 组件中，父子组件通信可以通过 `props` 和 `$emit` 实现，兄弟组件通信可以通过 `provide` 和 `inject` 实现，但是当组件层级较深或者关系复杂时，这些方式就显得不够灵活。EventBus 可以实现任意组件间通信，不受组件层级限制。

::: details 实现源码
<<< ../../../../packages/utils/src/event/eventBus.ts
:::

## 介绍

本文 EventBus 是基于发布订阅模式实现的，因此可以在任何需要发布消息的地方使用。它包含四个方法：

- `$on(event: string, callback: Function)`：监听事件，当事件触发时执行回调函数。
- `$emit(event: string, ...args: any[])`：触发事件，执行所有监听该事件的回调函数。
- `$off(event: string, listener?: Function)`：取消监听事件。
- `clear()`：清空所有事件监听。

> 发布订阅模式是一种消息范式，消息的发送者（发布者）不会将消息直接发送给特定的接收者（订阅者），而是将消息分为不同的主题（频道），然后将消息发布到这些主题，订阅该主题的订阅者将收到消息。

## 基本用法

### 创建 EventBus 实例

<<< ./eventBus.ts

### 发送事件

```ts
import { eventBus } from './eventBus';

eventBus.$emit('test', 'Hello, EventBus!')
```

### 监听事件

```ts
import { eventBus } from './eventBus';

eventBus.$on('test', (data) => {
  console.log(data); // Hello, EventBus!
})
```

### 取消监听

```ts
import { eventBus } from './eventBus';

eventBus.$off('test');
```

## 组件通信示例

<script setup lang="ts">
  import ExampleOn from './ExampleOn.vue';
  import ExampleEmit from './ExampleEmit.vue';
</script>

<ExampleOn />
<ExampleEmit />

::: details 示例代码
<<< ./ExampleOn.vue
<<< ./ExampleEmit.vue
:::
