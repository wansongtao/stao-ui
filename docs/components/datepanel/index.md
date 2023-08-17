<script lang="ts" setup>
import SimpleExample from './SimpleExample.vue'
</script>
# DatePanel 日期面板

通过点击面板中的文本，可以快速选择日期范围。
::: tip
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
:::  

::: details 源代码
<<< ../../../packages/components/src/DatePanel/index.vue
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
| title | 面板标题 | _string_ | - |
| activeKey | 当前选中的文本 | _'week' \| 'lastWeek' \| 'month' \| 'lastMonth' \| 'year'_ | - |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| changeDate | 选中文本改变时触发 | _(data: { startDate: string; endDate: string; }) => void_ |
