<script lang="ts" setup>
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
  <div class="flex">
    <div class="container">
      <STextEllipsis @click="changeText(status)" @change-status="onChange">
        {{ text }}
      </STextEllipsis>
    </div>
    <div>
      文本是否超出范围：<span style="color: red">{{ status }}</span>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  align-items: center;
}
.container {
  margin-right: 10px;
  padding: 0 10px;
  width: 200px;
  height: 40px;
  line-height: 40px;
  border: 1px dotted #ccc;
  cursor: pointer;
  user-select: none;
}
</style>
