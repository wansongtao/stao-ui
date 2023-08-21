# useElTableSelection

<script setup lang="ts">
  import SimpleExample from './simple.vue';
</script>

element-plus 表格跨页多选功能 hooks.

::: details 源码
<<< ../../../../packages/utils/src/hooks/useElTableSelection.ts
:::

## 基础用法

选中一些数据后, 翻页, 再选中一些数据, 会自动合并到已选中的数据中，且翻页回去保留已选中状态.
<SimpleExample />

::: details 查看示例代码
<<< ./simple.vue
:::
