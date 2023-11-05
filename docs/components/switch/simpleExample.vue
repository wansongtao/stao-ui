<script lang="ts" setup>
import { SSwitch } from '@stao-ui/components';
import { ref } from 'vue';

const status = ref(false);
const status1 = ref(false);
const status2 = ref(false);
</script>

<template>
  <div class="flexbox">
    <s-switch v-model:checked="status" />
    <s-switch v-model:checked="status1">
      <tempalte />
    </s-switch>
    <s-switch v-model:checked="status2">
      <template #default="{ checked }">
        {{ checked ? '关' : '开' }}
      </template>
    </s-switch>
  </div>
</template>

<style lang="scss" scoped>
.flexbox {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
