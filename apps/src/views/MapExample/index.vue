<script lang="ts" setup>
import SMap from '@/components/SMap/index.vue'

defineOptions({
  name: 'MapExample'
})
</script>

<template>
  <div class="container">
    <SMap />
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-top: 100px;
  width: 600px;
  height: 300px;
}
</style>