<script lang="ts" setup>
import SimpleExample from './SimpleExample.vue'
</script>

# 按钮组件

简单按钮组件，支持自定义样式，支持自定义内容。  
***使用场景：高度自定义按钮(一些大型组件库的按钮改起来麻烦)。***

::: tip
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
:::  

::: details 源代码
<<< ../../../packages/components/src/SButton/SButton.vue
:::

## 基础用法

<SimpleExample />

::: details 查看示例代码
<<< ./SimpleExample.vue
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮样式类型 | _'default' \| 'line'_ | `default` |
| disabled | 是否禁用 | _boolean_ | `false` |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- | 
| default | 需要显示的内容 | - | 
