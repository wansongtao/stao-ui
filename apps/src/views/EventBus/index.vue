<script lang="ts" setup>
import ButtonEmit from './component/ButtonEmit.vue';
import ButtonOn from './component/ButtonOn.vue';

defineOptions({
  name: 'EventBus'
})
</script>

<template>
  <div class="page">
    <button-emit />
    <button-on />
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 50px;
  width: 100%;
}
</style>