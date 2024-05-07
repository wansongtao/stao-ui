# TextScroll 文字滚动

文字滚动组件，用于展示文字无缝滚动效果，支持控制滚动速度。文本超出容器宽度时会自动滚动。

::: tip
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。
:::  

::: details 源代码
<<< ../../../packages/components/src/TextScroll/index.vue
:::

## 使用示例

<script lang="ts" setup>
import ExampleView from './ExampleView.vue'
</script>

<ExampleView />

::: details 查看示例代码
<<< ./ExampleView.vue
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 文字 | _string_ | - |
| speed | 滚动速度，值越大速度越慢 | _number_ | `4` |
