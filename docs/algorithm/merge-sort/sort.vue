<script lang="ts" setup>
import BaseSort from '../component/baseSort.vue'
import mergeSort from './mergeSort';
</script>

<template>
  <base-sort :sort="mergeSort" />
</template>
