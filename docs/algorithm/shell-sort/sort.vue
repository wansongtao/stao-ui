<script lang="ts" setup>
import BaseSort from '../component/baseSort.vue'
import shellSort from './shellSort';
</script>

<template>
  <base-sort :sort="shellSort" />
</template>
