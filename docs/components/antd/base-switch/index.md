<script setup>
import SimpleExample from './simple.vue'
import AdvancedExample from './advanced.vue'
</script>

# Switch 开关

封装`Ant Design Vue Switch`，用于快速创建一个开关，可以用作项目的基础组件，方便统一整个项目的switch组件风格。

::: tip 提示
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
:::

::: details 源代码
<<< ../../../../packages/components/src/antDesign/ASwitch/index.vue
:::

## 基础用法

<SimpleExample />

::: details 查看示例代码
<<< ./simple.vue
:::

## 进阶用法

使用`data`属性传输额外数据，可以在`change`与`click`事件中获取到`data`数据。  
***使用场景：在表格中使用该组件时，可以传输当前行数据（如：ID），方便调用接口更改状态。***

<AdvancedExample />

::: details 查看示例代码
<<< ./advanced.vue
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| (v-model)checked | 绑定值 | _boolean_ | `false` |
| disabled | 是否禁用 | _boolean_ | `false` |
| checkedChildren | 选中时的内容 | _string \| Slot_ | - |
| checkedValue | 选中时的值 | _boolean \| string \| number_ | `true` |
| unCheckedChildren | 非选中时的内容 | _string \| Slot_ | - |
| unCheckedValue | 非选中时的值 | _boolean \| string \| number_ | `false` |
| loading | 加载中的开关 | _boolean_ | `false` |
| size | 开关大小 | _'small' \| 'default'_ | `default` |
| autoFocus | 自动获取焦点 | _boolean_ | `false` |
| data | 额外数据 | _any_ | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 开关变化时触发 | _(data: { checked: boolean \| string \| number; data?: T; e: Event }) => void_ |
| click | 点击时触发 | _(data: { checked: boolean \| string \| number; data?: T; e: Event }) => void_ |
