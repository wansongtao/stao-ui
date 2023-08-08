<script setup lang="ts">
import { STaoFileSelector } from '@stao-ui/components';
import { ref } from 'vue'
import advancedExample from './advanced.vue'

const checkedFiles = ref<File[]>([])
const onChangeFile = (files: File[]) => {
  checkedFiles.value = files
}
</script>

<style scoped>
  .container {
    width: 200px;
  }
  details {
    cursor: pointer;
  }
  .button {
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .flex {
    display: flex;
    flex-wrap: wrap;
  }
  .ml-30 {
    margin-left: 30px;
  }
  .mt-20 {
    margin-top: 20px;
  }
</style>

# 文件选择组件

主要功能：限制文件数量，限制文件大小，限制文件类型，拖拽选择文件，自定义按钮内容，自定义按钮样式，禁用，目录上传。

::: tip
目前建议复制源代码到自己的项目中使用，因为组件库还在开发中，不稳定，不建议直接使用。  
使用场景：不需要大型组件库那么多功能的上传组件，或者需要高度自定义的上传组件。
:::

::: details 源代码
<<< ../../../packages/components/src/FileSelector/FileSelector.vue
:::

## 基础用法

<div class="flex">
  <STaoFileSelector />
  <STaoFileSelector :limit="6">
    <div class="button ml-30">限制文件数量</div>
  </STaoFileSelector>
  <STaoFileSelector accept="image/png, image/jpg, image/jpeg">
    <div class="button ml-30">选择图片</div>
  </STaoFileSelector>
  <STaoFileSelector :drag="true">
    <div class="button ml-30">拖拽选择</div>
  </STaoFileSelector>
  <STaoFileSelector :size="1024 * 1024 * 2">
    <div class="button ml-30">2M以下</div>
  </STaoFileSelector>
</div>

<details>
<summary>查看代码</summary>

```vue
<template>
  <div class="flex">
    <STaoFileSelector />
    <STaoFileSelector :limit="6">
      <div class="button ml-30">限制文件数量</div>
    </STaoFileSelector>
    <STaoFileSelector accept="image/png, image/jpg, image/jpeg">
      <div class="button ml-30">选择图片</div>
    </STaoFileSelector>
    <STaoFileSelector :drag="true">
      <div class="button ml-30">拖拽选择</div>
    </STaoFileSelector>
    <STaoFileSelector :size="1024 * 1024 * 2">
      <div class="button ml-30">2M以下</div>
    </STaoFileSelector>
  </div>
</template>
<script lang="ts" setup>
import { STaoFileSelector } from '@stao-ui/components';
</script>
<style scoped>
.button {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.flex {
  display: flex;
  flex-wrap: wrap;
}
.ml-30 {
  margin-left: 30px;
}
</style>
```

</details>

## 进阶用法
获取已选择文件列表，自定义按钮内容，自定义按钮样式，禁用状态。调用组件方法。
<div class="container">
  <STaoFileSelector :limit="2" :size="1024 * 1024 * 2" @change-file="onChangeFile">
      <template #default="{ disabled }">
        <div class="button">文件上传 - {{ disabled }}</div>
      </template>
    </STaoFileSelector>
  <p class="mt-20" v-show="checkedFiles.length">
    已选择文件：
    <span v-for="(file, idx) in checkedFiles" :key="file.name" :class="idx!==0 ? 'ml-30' : ''">
      {{ file.name }}
    </span>
  </p>
</div>

<details>
<summary>查看代码</summary>

```vue
<script lang="ts" setup>
import { STaoFileSelector } from '@stao-ui/components'
import { ref } from 'vue'

const fileRef = ref<InstanceType<typeof STaoFileSelector> | null>(null)
const checkedFiles = ref<File[]>([])
const onChangeFile = (files: File[]) => {
  checkedFiles.value = files

  if (checkedFiles.value.length >= 2) {
    fileRef.value?.clearFiles()
    checkedFiles.value = []
  }
}
</script>

<template>
  <div class="container">
    <STaoFileSelector ref="fileRef" :limit="2" :size="1024 * 1024 * 2" @change-file="onChangeFile">
      <template #default="{ disabled }">
        <div class="btn">文件上传 - {{ disabled }}</div>
      </template>
    </STaoFileSelector>
    <p class="list" v-show="checkedFiles.length">
      已选择文件：
      <span v-for="file in checkedFiles" :key="file.name">
        {{ file.name }}
      </span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  padding: 8px 12px;
  border: 1px solid #999;
}

.list {
  margin-top: 20px;

  span {
    margin-right: 10px;
  }
}
</style>

```

</details>

上传图片示例
<advancedExample />
::: details 查看代码
<<< ./advanced.vue
:::
