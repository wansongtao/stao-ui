<script lang="ts" setup>
import { useTextEllipsis } from '@stao-ui/utils';
import { watch } from 'vue';

defineOptions({
  name: 'TextEllipsis'
});
const $emits = defineEmits<{
  changeStatus: [value: boolean];
}>();

const { isOverflow, blockRef } = useTextEllipsis();
watch(
  isOverflow,
  (value) => {
    $emits('changeStatus', value);
  },
  { immediate: true }
);
</script>

<template>
  <div ref="blockRef" class="ellipsis">
    <span><slot :isOverflow="isOverflow" /></span>
  </div>
</template>

<style lang="scss" scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
</style>
