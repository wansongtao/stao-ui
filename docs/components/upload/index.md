<script setup lang="ts">
import UploadImg from './UploadImg.vue'
import SimpleExample from './SimpleExample.vue'
import AdvancedExample from './AdvancedExample.vue'
</script>
# 文件选择组件

主要功能：限制文件数量，限制文件大小，限制文件类型，拖拽选择文件，自定义按钮内容，自定义按钮样式，禁用，目录上传。  
使用场景：不需要大型组件库那么多功能的上传组件，或者需要高度自定义的上传组件。

::: tip
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。  

:::

::: details 源代码
<<< ../../../packages/components/src/FileSelector/FileSelector.vue
:::

## 基础用法

<SimpleExample />

::: details 查看示例代码
<<< ./SimpleExample.vue
:::

## 进阶用法

获取已选择文件列表，自定义按钮内容，自定义按钮样式，禁用状态。调用组件方法。

<AdvancedExample />

::: details 查看示例代码
<<< ./AdvancedExample.vue
:::

上传图片示例

<UploadImg />
::: details 查看代码
<<< ./UploadImg.vue
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| webkitdirectory | 是否启用上传目录功能 | _boolean_ | `false` |
| accept | 唯一文件类型说明符 | _string_ | - |
| limit | 允许选择的文件个数 | _number_ | `1` |
| drag | 是否启用拖拽获取文件 | _boolean_ | `false` | 
| excessReplace | 超出限制的文件数时，是否允许继续选择文件 | _boolean_ | `false` | 
| size | 单个文件最大字节 | _number_ | - | 
| disabled | 是否禁用 | _boolean_ | `false` | 

### Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- | 
| changeFile | 选择文件回调 | `Function(files: File[]){}` | 
| overSize | 选择文件超出大小回调 | `Function(overFiles: File[]){}` | 
| onSelectFile | 打开选择文件弹窗（实例方法） | `Function(){}` | 
| deleteFile | 删除已选择文件（实例方法） | `Function(index: number){}` | 
| clearFiles | 清空所有已选择文件（实例方法） | `Function(){}` | 
| verifyFile | 校验文件（实例方法） | `Function(file: File, size?: number, type?: string): boolean {}` | 
