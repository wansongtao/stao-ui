<script lang="ts" setup>
import { ref } from 'vue';
import { STabs } from '@stao-ui/components';

const tabs = ref([
  { id: 1, name: 'tab 1' },
  { id: 2, name: 'tab 2' },
  { id: 3, name: 'tab 3' }
]);
</script>

<template>
  <div class="container">
    <STabs :tabs="tabs">
      <template #default="{ index }">
        <div class="content">
          {{ index + 1 }}
        </div>
      </template>
    </STabs>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;

  .content {
    padding: 10px 0;
  }
}
</style>
