<script lang="ts" setup>
import { STaoButton } from '@stao-ui/components';
</script>

<template>
  <div class="container">
    <STaoButton>默认按钮</STaoButton>
    <div class="p-20">
      <STaoButton type="line">线框按钮</STaoButton>
    </div>
    <STaoButton type="line" :disabled="true">禁用按钮</STaoButton>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.p-20 {
  padding: 0 20px;
  width: 100%;
}
</style>
