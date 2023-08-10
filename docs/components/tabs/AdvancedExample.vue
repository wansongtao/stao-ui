<script lang="ts" setup>
import { ref } from 'vue';
import { STabs } from '@stao-ui/components';

const tabs = ref([
  { id: 1, name: 'tab 1' },
  { id: 2, name: 'tab 2' },
  { id: 3, name: 'tab 3' }
]);

const activeId = ref(2);
const onChange = (index: number) => {
  console.log(`change to tab ${index + 1}, id: ${activeId.value}`);
};
</script>

<template>
  <div class="container">
    <STabs
      v-model:activeId="activeId"
      :tabs="tabs"
      type="card"
      :is-destroy-change="true"
      @on-change="onChange">
      <template #default="{ index, item }">
        <div class="content">
          {{ index + 1 }}：{{ item.name }}
        </div>
      </template>
    </STabs>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;

  .content {
    padding: 10px;
    border: 1px dotted #eee;
  }
}
</style>
