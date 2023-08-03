<script setup>
  import { STaoButton } from '@stao-ui/components';
</script>

<style scoped>
  .container {
    width: 200px;
  }
  details {
    cursor: pointer;
  }
</style>

# 按钮组件
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
::: tip
使用场景：高度自定义按钮(一些大型组件库的按钮改起来麻烦)，可以使用slot来自定义按钮的内容，可以使用type来定义按钮的样式，可以使用disabled来定义按钮的禁用状态。
:::  

::: details 源代码
<<< ../../../packages/components/SButton/SButton.vue
:::

## 基础用法
可以使用type来定义样式，目前只要两种样式，一种是默认的实心样式，一种是线框样式。

<div class="container">
<STaoButton>按钮</STaoButton>
<br />
<STaoButton type="line">按钮</STaoButton>
</div>

<details>
<summary>查看代码</summary>

```vue
<template>
  <STaoButton>按钮</STaoButton>
  <STaoButton type="line">按钮</STaoButton>
</template>
<script lang="ts" setup>
import { STaoButton } from "@stao-ui/components";
</script>
```

</details>

## 禁用状态

<div class="container">
  <STaoButton :disabled="true">禁用按钮</STaoButton>
</div>

<details>
<summary>查看代码</summary>

```vue
<template>
  <STaoButton :disabled="true">禁用按钮</STaoButton>
</template>
<script lang="ts" setup>
import { STaoButton } from "@stao-ui/components";
</script>
```

</details>
