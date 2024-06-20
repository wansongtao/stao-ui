# useTextEllipsis

该 hook 用于获取设置了单行文本超出显示省略号样式的元素的状态（是否显示了省略号）。

::: details 实现源码
<<< ../../../../packages/utils/src/hooks/useTextEllipsis.ts
:::

## 介绍

该 hook 接收一个布尔值参数，用来设置是否自动监听dom元素的变化并变更状态。

返回值为一个对象，包含以下属性：
- `isEllipsis` 是否显示了省略号；
- `updateStatus` 更新状态函数;
- `blockRef` 用于绑定到需要监听的dom元素。

## 使用

配合`ant-design-vue`的`tooltip`组件，可以实现文本超出了，才显示完整文字气泡提示的效果。

<script setup lang="ts">
  import ExampleView from './ExampleView.vue'
</script>

<ExampleView />

::: details 示例代码
<<< ./ExampleView.vue
:::
