<script lang="ts" setup>
import BaseSort from '../component/baseSort.vue'
import quickSort from './quickSort';
</script>

<template>
  <base-sort :sort="quickSort" />
</template>
