<script lang="ts" setup>
import { SElButtonConfirm } from '@stao-ui/components';
</script>

<template>
  <div class="container">
    <SElButtonConfirm />
    <SElButtonConfirm
      title="危险操作"
      button-text="delete"
      type="error"
      content="删除后将不可恢复，请谨慎操作！"
      confirm-button-text="OK"
      cancel-button-text="Cancel" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
}
</style>
