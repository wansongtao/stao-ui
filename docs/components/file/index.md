# FileSelector 文件选择

文件选择器组件，用于选择文件。支持多选、拖拽上传等功能。

::: details 组件源码
<<< ../../../packages/components/src/FileSelector/FileSelector.vue
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
| limit | 文件数量限制 | _number_ | `1` |
| accept | 接受上传的文件类型 | _string_ | - |
| size | 文件大小限制，单位为`字节` | _number_ | - |
| drag | 是否允许拖拽上传 | _boolean_ | `false` |
| excessReplace | 是否用新文件替换旧文件 | _boolean_ | `false` |
| disabled | 是否禁用 | _boolean_ | `false` |
| webkitdirectory | 是否支持文件夹上传 (设置为true后，accept、limit、drag将不生效) | _boolean_ | `false` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| change | 文件选择变化时触发 | _files: File[]_ |
| exceed-size | 文件大小超出限制时触发 | _files: File[]_ |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义内容 | _{ disabled: boolean }_ |
