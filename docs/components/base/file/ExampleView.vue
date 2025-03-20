<script lang="ts" setup>
import FileSelector from '@/FileSelector/FileSelector.vue';
</script>

<template>
  <div class="flex">
    <FileSelector />

    <div class="ml-20">
      <FileSelector accept="image/*">
        <div class="upload">选择图片</div>
      </FileSelector>
    </div>

    <div class="ml-20">
      <FileSelector accept="image/*" :limit="2">
        <div class="upload">选择两张图片</div>
      </FileSelector>
    </div>
    
    <div class="ml-20">
      <FileSelector accept="image/*" :size="1024 * 1024">
        <div class="upload">选择 1M 以内的图片</div>
      </FileSelector>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
}
.ml-20 {
  margin-left: 20px;
}
.upload {
  padding: 5px 10px;
  background-color: #409eff;
  color: #fff;
  border-radius: 4px;
}
</style>
