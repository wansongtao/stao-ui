# CodeForm 

接收一个props为需要渲染的表单字符串，渲染后自动submit表单，然后在iframe里渲染提交内容。  
***使用场景：网页接入支付宝支付，后端接口返回的是一个表单字符串，使用此组件不会跳转到外部页面而是显示支付二维码。***

::: tip
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
:::  

::: details 源代码
<<< ../../../packages/components/src/CodeForm/index.vue
:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| formHtml | 需要渲染的表单 | `string` | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| handleLoaded | iframe的onload事件后触发 | `(load: boolean) => void` |
