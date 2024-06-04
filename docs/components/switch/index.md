# Switch 开关

开关选择组件，支持自定义选中值、自定义文本、自定义颜色、禁用。

::: details 组件源码
<<< ../../../packages/components/src/BaseSwitch/BaseSwitch.vue
:::

## 基本用法

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
| checked(v-model) | 绑定值 | _boolean \| number \| string_ | `false` |
| activeValue | 选中值 | _boolean \| number \| string_ | - |
| inactiveValue | 未选中值 | _boolean \| number \| string_ | - |
| activeText | 选中文本 | _string_ | `YES` |
| inactiveText | 未选中文本 | _string_ | `NO` |
| activeColor | 选中颜色 | _string_ | `#03a9f4` |
| activeBgColor | 选中背景颜色 | _string_ | `#ebf7fc` |
| inactiveColor | 未选中颜色 | _string_ | `#f44336` |
| inactiveBgColor | 未选中背景颜色 | _string_ | `#fcebeb` |
| disabled | 是否禁用 | _boolean_ | `false` |
| textColor | 文本颜色 | _string_ | `#fff` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:checked | 开关状态切换时触发 | _checked: boolean \| number \| string_ |
