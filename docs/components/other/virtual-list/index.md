# Virtual List 虚拟列表

简易虚拟列表泛型组件。

::: details 组件源码
<<< ../../../../packages/components/src/VirtualList/VirtualList.vue
:::

::: details hooks 源码
<<< ../../../../packages/components/src/VirtualList/hooks/use-virtual-list.ts
:::

## 基本用法

传入每项高度、容器总高度、每一项的 key 以及数据列表即可。

<script lang="ts" setup>
import ExampleView from './ExampleView.vue'
</script>

<ExampleView />

::: details 示例代码
<<< ./ExampleView.vue
:::

## API

### Props

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataList | 渲染列表数据 | _T[]_ | - |
| itemHeight | 每项高度 | _number_ | - |
| containerHeight | 容器高度 | _string_ | - |
| getItemKey | 每一项的 key | _(item: T) => string \| number \| void_ | - |
| overscan | 预渲染的额外项目数量，提升滚动流畅度 | _number_ | 5 |
| containerStyle | 容器样式 | _string_ | - |
| itemStyle | 每项样式 | _string_ | - |
| hiddenScrollbar | 是否隐藏滚动条 | _boolean_ | false |
| scrollThrottleTime | 滚动节流时间 | _number_ | 16 |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| contextmenu | 鼠标右键事件 | _e: MouseEvent_ |
| rowClick | 行点击事件 | _data: T, index: number_ |
| scroll | 滚动事件 | _e: Event_ |
| change | 可视区域数据变化时触发 | _visibleData: T[], beginIndex: number, endIndex: number_ |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 行内容 | _{ item: T, itemIndex: number }_ |
| empty | 空状态内容 | _ |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| handleScroll | 滚动到指定位置 | _options?: ScrollToOptions_ |
| handleScrollTo | 滚动到指定行 | _index: number_ |
