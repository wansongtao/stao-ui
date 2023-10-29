<script lang="ts" setup>
import AInputNumber from 'ant-design-vue/es/input-number';
import 'ant-design-vue/es/input-number/style/css';
import AButton from 'ant-design-vue/es/button';
import 'ant-design-vue/es/button/style/css';

import { ref } from 'vue';
import bubbleSort from './bubbleSort';
import { getPseudoRandomNumber, getArray } from '@stao-ui/utils';

const min = ref(0);
const max = ref(100);
const len = ref(20);
const loading = ref(false);

const arr = ref<number[]>([]);
const times = ref(0);

const onSort = () => {
  if (loading.value) return;
  loading.value = true;

  // 按钮过渡动画时间300ms
  setTimeout(() => {
    arr.value = getArray(len.value, () =>
      getPseudoRandomNumber(min.value, max.value)
    );
    const start = performance.now();

    bubbleSort(arr.value);

    times.value = performance.now() - start;
    loading.value = false;
  }, 300);
};
</script>

<template>
  <div class="container">
    <div class="item">
      <span>最小值：</span>
      <a-input-number v-model:value="min" :max="max" />
    </div>
    <div class="item">
      <span>最大值：</span>
      <a-input-number v-model:value="max" :min="min" />
    </div>
    <div class="item">
      <span>数组长度：</span>
      <a-input-number v-model:value="len" :min="1" @press-enter="onSort" />
    </div>
    <a-button type="primary" :loading="loading" @click="onSort"
      >开始排序</a-button
    >
  </div>
  <div class="mt-20" v-show="times && arr.length">
    <div class="flexbox">
      <span>排序耗时：</span>
      <span>{{ times.toFixed(3) }} ms</span>
    </div>
    <div class="flexbox">
      <span style="flex-shrink: 0">排序结果：</span>
      <p class="ellipsis-multi">{{ arr.join(', ') }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mt-20 {
  margin-top: 20px;
}

.flexbox {
  display: flex;
  align-items: center;
}

/* 超出两行 */
.ellipsis-multi {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
