<script setup>
import SimpleExample from './simple.vue'
</script>
# ButtonConfirm 确认按钮

封装`ElMessageBox.confirm`，用于快速创建一个确认操作按钮。

::: tip 提示
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
:::

::: details 源代码
<<< ../../../../packages/components/src/elementPlus/SButtonConfirm/index.vue
:::

## 基础用法

<simple-example />

::: details 查看示例代码
<<< ./simple.vue
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| buttonText | 按钮文本 | _string_ | `删除` |
| content | 内容 | _string_ | `此操作不可逆, 是否继续?` |
| confirmButtonText | 确认按钮文字 | _string_ | `确定` |
| cancelButtonText | 取消按钮文字 | _string_ | `取消` |
| title | 标题 | _string_ | `警告` |
| type | 确认弹窗类型 | _'success' \| 'info' \| 'warning' \| 'error'_ | `warning` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| handleConfirm | 点击确认按钮时触发 | _() => void_ |
| handleCancel | 点击取消按钮时触发 | _() => void_ |
