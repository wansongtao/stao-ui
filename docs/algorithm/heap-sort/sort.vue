<script lang="ts" setup>
import BaseSort from '../component/baseSort.vue'
import heapSort from './heapSort';
</script>

<template>
  <base-sort :sort="heapSort" />
</template>
