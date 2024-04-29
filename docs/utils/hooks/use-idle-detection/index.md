# useIdleDetection

::: tip
建议复制源码到自己的项目中使用。
:::

## 介绍

用于检测用户是否处于空闲状态，接收四个参数：1. 第一个必选参数为空闲时执行的回调函数； 2. 第二个可选参数为空闲时间； 3. 第三个可选参数为是否立即开始；4. 第四个可选参数为离开组件是否停止检测。返回三个函数，分别是开始检测函数、停止检测函数、重新开始检测函数。

**_使用场景：用户一定时间无操作，退出到登录页。_**

::: details hooks 实现
<<< ../../../../packages/utils/src/hooks/useIdleDetection.ts
:::

::: details idleDetection 实现
<<< ../../../../packages/utils/src/utils.ts#idleDetection
:::

## 使用

```ts
<script setup lang="ts">
import { useIdleDetection } from '@stao-ui/utils';

const [startIdleDetection, stopIdleDetection, restartIdleDetection] =
  useIdleDetection(
    () => {
      console.log('用户10s无操作');
    },
    10000,
    true
  );

startIdleDetection();
</script>
```
