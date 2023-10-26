<!-- <script lang="ts" setup>
import { SAntBaseSwitch } from '@stao-ui/components';
import { ref } from 'vue';

const checked1 = ref(false);
// 如果需要传递额外的数据，可以使用 data 属性，例如：在表格中，需要传递当前行的数据
const data1 = ref({ id: '1' });
const onChange = (value: {
  checked: boolean;
  e: Event;
  data: { id: string };
}) => {
  // todo：如调用接口修改状态
  console.log(value);
};

const checked2 = ref(true);
const data2 = ref({ id: '2' });

const checked3 = ref(false);
const loading = ref(false);
const onRequest = (value: { checked: boolean; }) => {
  if (loading.value) return;
  loading.value = true;

  setTimeout(() => {
    checked3.value = value.checked;
    loading.value = false;
  }, 1000);
};
</script>

<template>
  <div class="container">
    <SAntBaseSwitch
      v-model:checked="checked1"
      :data="data1"
      @change="onChange" />
    <SAntBaseSwitch
      v-model:checked="checked2"
      :data="data2"
      checked-children="开"
      un-checked-children="关"
      @click="onChange" />
    <SAntBaseSwitch
      :checked="checked3"
      :loading="loading"
      checked-children="loading"
      un-checked-children="loading"
      @change="onRequest" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;

  :deep(.base-switch) {
    margin-right: 20px;
  }
}
</style> -->
