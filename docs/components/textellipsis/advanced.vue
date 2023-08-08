<script lang="ts" setup>
import { STextEllipsis } from '@stao-ui/components';
import { ref } from 'vue';
import { Tooltip as ATooltip } from 'ant-design-vue';

const text = ref('不过是大梦一场空，不过是孤影照惊鸿。');
const changeText = () => {
  if (text.value === '不过是大梦一场空，不过是孤影照惊鸿。') {
    text.value = '大梦一场空';
    return;
  }

  text.value = '不过是大梦一场空，不过是孤影照惊鸿。';
};
</script>

<template>
  <div class="container">
    <STextEllipsis @click="changeText">
      <template #default="{ isOverflow }">
        <a-tooltip v-if="isOverflow">
          <template #title>{{ text }}</template>
          {{ text }}
        </a-tooltip>

        <span v-else>{{ text }}</span>
      </template>
    </STextEllipsis>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 200px;
  cursor: pointer;
}
</style>
