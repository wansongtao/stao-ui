<script lang="ts" setup>
import BaseSort from '../component/baseSort.vue'
import insertionSort from './insertionSort';
</script>

<template>
  <base-sort :sort="insertionSort" />
</template>
