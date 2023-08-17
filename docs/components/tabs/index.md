<script lang="ts" setup>
import SimpleExample from './SimpleExample.vue'
import AdvancedExample from './AdvancedExample.vue'
</script>

# Tabs 标签页

选项卡切换组件，支持切换样式、隐藏销毁DOM结构、自定义选项卡图标/文字等。  
***使用场景：需要高度自定义的tabs组件时，可以使用该组件。***
::: tip 提示
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
:::

::: details 源代码
<<< ../../../packages/components/src/STabs/index.vue
:::

## 基础用法

<SimpleExample />

::: details 查看示例代码
<<< ./SimpleExample.vue
:::

## 进阶用法

<AdvancedExample />

::: details 查看示例代码
<<< ./AdvancedExample.vue
:::

## API

### Tabs Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeId(v-model) | 当前激活 tab 面板的 id | _string \| number_ | - |
| type | 标签页的样式，可选`default`与`card` | _'default' \| 'card'_ | `default` |
| tabs | 标签页的键值对列表 | _{ id: string \| number, name: string }[]_ | - |
| isDestroyChange | 被隐藏时是否销毁 DOM 结构 | _boolean_ | `false` |

### Tabs Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- | 
| onChange | 切换tabs的回调 | `(index: number) => void` | 

### Tabs Slots

| 名称 | 说明 | 参数 | 默认值 |
| --- | --- | --- | --- | 
| icon | 自定义选项卡图标 | `{ isActive: boolean, index: number }` | - |
| tab | 自定义选项卡文字 | `{ isActive: boolean, index: number, item: { id: string \| number, name: string } }` | `name` |
| default | 默认插槽，展示标签页内容 | `{ index: number, item: { id: string \| number, name: string } }` | - | 
