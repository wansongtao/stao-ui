<script lang="ts" setup>
import VirtualList from '@/VirtualList/VirtualList.vue';
import { ref } from 'vue';

const list = ref<number[]>([]);
for (let i = 0; i < 50; i++) {
  list.value.push(i);
}
</script>

<template>
  <div class="container">
    <virtual-list
      :item-height="30"
      container-height="210px"
      :data-list="list"
      :get-item-key="(v) => v"
      container-style="background-color: #f0f0f0;"
      item-style="color: #333; border-bottom: 1px solid #999; text-align: center;">
      <template #default="{ item }">
        {{ item + 1 }}
      </template>
    </virtual-list>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 40px;
  height: 210px;
  box-sizing: border-box;
  border: 1px dotted #000;
}
</style>
