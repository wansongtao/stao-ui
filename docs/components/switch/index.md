<script lang="ts" setup>
import SimpleExample from './SimpleExample.vue'
</script>

# Switch 开关

开关按钮组件，支持自定义样式，支持自定义开关内容。  
***使用场景：切换网站主题。***

::: tip
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
:::  

::: details 源代码
<<< ../../../packages/components/src/SSwitch/index.vue
:::

## 基础用法

<SimpleExample />

::: details 查看示例代码
<<< ./simpleExample.vue
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked(v-model) | 是否选中 | _boolean_ | `false` |
| delay | 是否节流触发 | _number_ | `0` |

### Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- | 
| onChange | 开关状态变化触发 | `(isChecked: boolean) => void` | 

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- | 
| default | 需要显示的内容 | `{ checked: boolean }` | 

