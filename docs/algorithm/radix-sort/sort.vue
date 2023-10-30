<script lang="ts" setup>
import BaseSort from '../component/baseSort.vue'
import radixSort from './radixSort';
</script>

<template>
  <base-sort :sort="radixSort" />
</template>
