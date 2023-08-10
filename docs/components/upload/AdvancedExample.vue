<script lang="ts" setup>
import { STaoFileSelector } from '@stao-ui/components';
import { ref } from 'vue';

const checkedFiles = ref<File[]>([]);
const onChangeFile = (files: File[]) => {
  checkedFiles.value = files;
};
</script>

<template>
  <div class="container">
    <STaoFileSelector
      :limit="2"
      :size="1024 * 1024 * 2"
      @change-file="onChangeFile">
      <template #default="{ disabled }">
        <div class="button">文件上传 - {{ disabled }}</div>
      </template>
    </STaoFileSelector>
    <p class="mt-20" v-show="checkedFiles.length">
      已选择文件：
      <span
        v-for="(file, idx) in checkedFiles"
        :key="file.name"
        :class="idx !== 0 ? 'ml-30' : ''">
        {{ file.name }}
      </span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 200px;
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
