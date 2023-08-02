<script lang="ts" setup>
import { STaoFileSelector } from '@stao-ui/components'
import { ref } from 'vue'

defineOptions({
  name: 'FileExample'
})

const checkedFiles = ref<File[]>([])

const onChangeFile = (files: File[]) => {
  checkedFiles.value = files
  console.log(files)
}
</script>

<template>
  <div class="container">
    <STaoFileSelector :limit="10" :size="1024 * 1024 * 2" @change-file="onChangeFile">
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
