<script lang="ts" setup>
import { ElInputNumber, ElButton } from 'element-plus';
import 'element-plus/dist/index.css';
import { ref } from 'vue';
import { getPseudoRandomNumber, createArray } from '@stao-ui/utils';

const $props = defineProps<{
  sort: (arr: number[]) => number[];
}>();

const min = ref(0);
const max = ref(100);
const len = ref(20);

const loading = ref(false);
const arr = ref<number[]>([]);
const times = ref(0);

const onSort = () => {
  loading.value = true;

  // 按钮过渡动画时间100ms
  setTimeout(() => {
    arr.value = createArray(len.value, getPseudoRandomNumber(min.value, max.value));

    const start = performance.now();
    arr.value = $props.sort(arr.value);
    times.value = performance.now() - start;

    loading.value = false;
  }, 100);
};
</script>

<template>
  <div class="container">
    <div class="flexbox mr-20">
      <span class="flex-shrink">最小值：</span>
      <el-input-number v-model="min" :max="max" :controls="false" />
    </div>
    <div class="flexbox mr-20">
      <span class="flex-shrink">最大值：</span>
      <el-input-number v-model="max" :min="min" :controls="false" />
    </div>
    <div class="flexbox mr-20">
      <span class="flex-shrink">数组长度：</span>
      <el-input-number v-model="len" :min="1" :controls="false" />
    </div>
    <el-button type="primary" :loading="loading" @click="onSort">开始排序</el-button>
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

.mr-20 {
  margin-right: 20px;
}

.flexbox {
  display: flex;
  align-items: center;
}

.flex-shrink {
  flex-shrink: 0;
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
