<template>
  <div class="flex">
    <div class="horizontal">
      <auto-scroll>
        <div v-for="item in texts" class="card" :key="item">{{ item }}</div>
      </auto-scroll>
      <auto-scroll animate-direction="reverse">
        <div v-for="item in texts" class="card" :key="item">{{ item }}</div>
      </auto-scroll>
      <auto-scroll :speed="20">
        <div v-for="item in texts" class="card" :key="item">{{ item }}</div>
      </auto-scroll>
    </div>
    <div class="container">
      <auto-scroll direction="vertical">
        <div v-for="item in texts" class="card" :key="item">{{ item }}</div>
      </auto-scroll>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AutoScroll from '@/AutoScroll/AutoScroll.vue';

import { ref } from 'vue';

const texts = ref<string[]>(['桔子🍊', '香蕉🍌', '苹果🍎', '芒果🥭', '菠萝🍍']);
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;

  .card {
    padding: 5px 10px;
    border: 1px solid #666;
    border-radius: 8px;
  }

  .horizontal {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.container {
  flex-shrink: 0;
  width: 300px;
  height: 200px;
}
</style>
