# AliPayForm 支付宝付款表单

将支付宝的付款form表单字符串在组件中渲染，渲染完成后自动提交表单，然后在iframe中显示付款二维码。

::: details 组件源码
<<< ../../../../packages/components/src/AliPayForm/AliPayForm.vue
:::

## 基本用法

在vue组件中引入`AliPayForm`组件，如下：

```vue
<template>
  <ali-pay-form formHtml="..." />
</template>

<script lang="ts">
import AliPayForm from '...'
</script>
```
