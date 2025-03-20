<template>
  <div class="container">
    <div class="flex">
      <label for="" class="mr-10">简单使用:</label>
      <base-switch v-model:checked="checked1" />
    </div>

    <div class="flex">
      <label for="" class="mr-10">指定值:</label>
      <base-switch
        :active-value="1"
        :inactive-value="0"
        v-model:checked="checked2" />
    </div>

    <div class="flex">
      <label for="" class="mr-10">自定义文本:</label>
      <base-switch active-text="开" inactive-text="关" />
    </div>

    <div class="flex">
      <label for="" class="mr-10">自定义颜色:</label>
      <base-switch
        text-color="#000"
        active-color="#67C23A"
        active-bg-color="#f0f9eb"
        inactive-color="#fff"
        inactive-bg-color="#999" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseSwitch from '@/BaseSwitch/BaseSwitch.vue';

import { ref } from 'vue';

const checked1 = ref(false);
const checked2 = ref(1);
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
}

.flex {
  display: flex;
  align-items: center;
}

.mr-10 {
  margin-right: 10px;
}
</style>
