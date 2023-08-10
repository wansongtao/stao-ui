<script lang="ts" setup>
import { STaoButton } from '@stao-ui/components';
</script>

<template>
  <div class="container">
    <STaoButton>默认按钮</STaoButton>
    <STaoButton class="ml-20" type="line">线框按钮</STaoButton>
    <STaoButton class="ml-20" type="line" :disabled="true">禁用按钮</STaoButton>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.ml-20 {
  margin-left: 20px;
}
</style>
