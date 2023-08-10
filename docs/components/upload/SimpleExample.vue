<script lang="ts" setup>
import { STaoFileSelector } from '@stao-ui/components';
</script>

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

<style lang="scss" scoped>
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
