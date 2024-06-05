<script lang="ts" setup>
import { eventBus } from './eventBus';
import { ref } from 'vue';

const text = ref('')
eventBus.$on('test', (data) => {
  text.value = data
});
</script>

<template>
  <div class="message">接收到的信息：<strong>{{ text }}</strong></div>
</template>

<style lang="scss" scoped>
.message {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
