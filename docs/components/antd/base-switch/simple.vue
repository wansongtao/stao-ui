<script lang="ts" setup>
import { SAntBaseSwitch } from '@stao-ui/components';
import { ref } from 'vue';

const checked1 = ref(false);
const checked2 = ref(false);
</script>

<template>
  <div class="container">
    <SAntBaseSwitch v-model:checked="checked1" />
    <SAntBaseSwitch v-model:checked="checked2" checked-children="开" un-checked-children="关" />
    <SAntBaseSwitch disabled />
    <SAntBaseSwitch checked loading />
    <SAntBaseSwitch checked size="small" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;

  :deep(.base-switch) {
    margin-right: 20px;
  }
}
</style>