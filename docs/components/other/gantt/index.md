<script lang="ts" setup>
import ExampleView from './ExampleView.vue'
import DemoView from './DemoView.vue'
</script>

# Gantt 甘特图

甘特图泛型组件，使用 DOM 实现的简易甘特图组件，支持自定义块样式、块右键菜单等。经测试渲染 5w+ 行数据无丝毫卡顿。

::: details GanttChart 源码
<<< ../../../../packages/components/src/GanttChart/GanttChart.vue
:::

::: details StaticTable 源码
<<< ../../../../packages/components/src/GanttChart/components/StaticTable.vue
:::

::: details TimeLine 源码
<<< ../../../../packages/components/src/GanttChart/components/TimeLine.vue
:::

::: details useContextMenu 源码
<<< ../../../../packages/components/src/GanttChart/hooks/useContextMenu.ts
:::
::: details useGuideLine 源码
<<< ../../../../packages/components/src/GanttChart/hooks/useGuideLine.ts
:::
::: details useSetMountRange 源码
<<< ../../../../packages/components/src/GanttChart/hooks/useSetMountRange.ts
:::

::: details 工具方法
<<< ../../../../packages/components/src/GanttChart/utils.ts
:::

## 基本用法

<ExampleView />

::: details 示例代码
<<< ./ExampleView.vue
:::

## 进阶用法

通过传入类型，扩展一些特有属性。点击甘特图上的块，可以选中它。

<DemoView />

::: details 示例代码
<<< ./DemoView.vue
:::

## API

### Props

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| config | 配置 | _{ hourWidth: number; beginDate: string; endDate: string; height: number; lineHeight: number; }_ | 无
| canSelect | 是否允许选中块 | _boolean_ | -
| checked | 选中块的 ID | _(number \| string)[]_ | -
| data | 甘特图数据列表 | _T[][]_ | -
| scrollIndexMap | 指定滚动到特定区域 | _{ rowIndex: number; colIndex: number; }_ | -
| defaultPagesize | 初始渲染一页行数 | _number_ | 40

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击块时触发 | _{ indexMap: { pIndex: number; cIndex: number }; data: T; }_ |
| dblclick | 双击块时触发 | _{ indexMap: { pIndex: number; cIndex: number }; data: T; }_ |
| contextmenu | 鼠标右键点击块时触发 | _{ indexMap: { pIndex: number; cIndex: number }; data: T; }_ |
| update:checked | 选中项变化时触发 | _T['id'][]_ |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义块内容 | _{ data: T; index: { pIndex: number; cIndex: number } }_ |
| row-icon | 插入行头部 | _{ data: T }_ |
| context-menu | 自定义右键菜单 | _{ indexMap: { pIndex: number; cIndex: number }; data: T; }_ |
