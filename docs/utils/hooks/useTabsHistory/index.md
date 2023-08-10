# useTabsHistory

记录当前页面选中的标签页，刷新页面后恢复选中的标签页。
::: details 源码
<<< ../../../../packages/utils/src/hooks/useTabsHistory.ts
:::

## 配合 `element-plus Tabs` 组件使用

```vue
<script setup>
import useTabsHistory from '@/hooks/useTabsHistory';

const { activeKey, onChangeTabs } = useTabsHistory();
</script>

<template>
  <el-tabs type="card" v-model="activeKey" @tab-change="onChangeTabs">
    <el-tab-pane label="组件" lazy>
      <div class="page">组件</div>
    </el-tab-pane>
    <el-tab-pane label="函数" lazy>
      <div class="page">函数</div>
    </el-tab-pane>
    <el-tab-pane label="css" lazy>
      <div class="page">css</div>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped></style>
```

## 配合 `ant-design-vue Tabs` 组件使用

```vue
<script setup>
import useTabsHistory from '@/hooks/useTabsHistory';

const { activeKey, onChangeTabs } = useTabsHistory('1');
</script>

<template>
  <a-tabs v-model:activeKey="activeKey" @change="onChangeTabs">
    <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2">Content of Tab Pane 2</a-tab-pane>
    <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
</template>

<style lang="scss" scoped></style>
```
