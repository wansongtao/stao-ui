<script lang="ts" setup>
import { Tooltip as ATooltip } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { STextEllipsis } from '@stao-ui/components';
import { ref } from 'vue';

const text = ref('不过是大梦一场空，不过是孤影照惊鸿。');
const changeText = (mode: boolean) => {
  if (mode) {
    text.value = '大梦一场空';
    return;
  }

  text.value = '不过是大梦一场空，不过是孤影照惊鸿。';
};

const status = ref(false);
const onChange = (value: boolean) => {
  status.value = value;
};
</script>

<template>
  <div class="container">
    <a-tooltip v-if="status">
      <template #title>{{ text }}</template>
      <STextEllipsis @click="changeText(status)" @change-status="onChange">
        {{ text }}
      </STextEllipsis>
    </a-tooltip>
    <STextEllipsis
      v-if="!status"
      @click="changeText(status)"
      @change-status="onChange">
      {{ text }}
    </STextEllipsis>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 200px;
  cursor: pointer;
}
</style>
