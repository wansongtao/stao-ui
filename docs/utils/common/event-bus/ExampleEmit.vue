<script lang="ts" setup>
import { eventBus } from './eventBus';
import BaseButton from '@/BaseButton/BaseButton.vue'

const onClick = () => {
  const random = Math.floor(Math.random() * 10000);
  eventBus.$emit('test', 'Hello, ' + random.toString());
};
</script>

<template>
  <base-button @click="onClick">Emit</base-button>
</template>

<style lang="scss" scoped></style>
