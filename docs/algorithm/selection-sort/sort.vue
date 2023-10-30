<script lang="ts" setup>
import BaseSort from '../component/baseSort.vue';
import selectionSort from './selectionSort';
</script>

<template>
  <base-sort :sort="selectionSort" />
</template>

<style lang="scss" scoped></style>
