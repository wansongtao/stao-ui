<script lang="ts" setup>
import BaseSort from '../component/baseSort.vue'
import countingSort from './countingSort';
</script>

<template>
  <base-sort :sort="countingSort" />
</template>
