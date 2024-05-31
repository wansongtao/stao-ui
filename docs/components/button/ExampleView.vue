<template>
  <div class="container">
    <BaseButton>默认按钮</BaseButton>
    <div class="pl-20">
      <BaseButton status="danger">危险按钮</BaseButton>
    </div>

    <div class="pl-20"><BaseButton disabled>禁用按钮</BaseButton></div>
    <div class="pl-20">
      <BaseButton status="danger" disabled>禁用按钮</BaseButton>
    </div>
  </div>

  <div class="pt-20 container">
    <BaseButton type="outline">线框按钮</BaseButton>
    <div class="pl-20">
      <BaseButton type="outline" status="danger">危险按钮</BaseButton>
    </div>

    <div class="pl-20">
      <BaseButton type="outline" disabled>禁用按钮</BaseButton>
    </div>
    <div class="pl-20">
      <BaseButton type="outline" status="danger" disabled>禁用按钮</BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from '@/BaseButton/BaseButton.vue';
</script>


<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.pl-20 {
  padding-left: 20px;
  width: 100%;
}

.pt-20 {
  padding-top: 20px;
}
</style>
