# Loading 加载

加载中状态组件，自动居中显示，支持设置是否显示遮罩层与其颜色。

::: details 组件源码
<<< ../../../packages/components/src/BaseLoader/BaseLoader.vue
:::

## 基础用法

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
| type | 类型 | _'circle' \| 'cube'_ | `circle` |
| loading | 加载状态 | _boolean_ | `false` |
| showMask | 是否显示遮罩 | _boolean_ | `true` |
| maskColor | 遮罩颜色 | _string_ | `transparent` |

