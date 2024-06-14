<template>
  <div class="flex">
    <div class="container">
      加载动画，不显示遮罩
      <base-loading loading :show-mask="false" />
    </div>
    <div class="container">
      加载动画，设置遮罩颜色
      <base-loading type="cube" loading mask-color="rgba(0, 0, 0, 0.5)" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseLoading from '@/BaseLoader/BaseLoader.vue';
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  gap: 20px;
}
.container {
  position: relative;
  padding: 10px 20px;
  width: 100%;
  height: 100px;
  background-color: #f0f0f0;
}
</style>
