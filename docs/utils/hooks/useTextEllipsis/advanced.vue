<script lang="ts" setup>
import { useTextEllipsis } from '@stao-ui/utils';
import { ref, nextTick } from 'vue';

const { textEllipsisRef, isOverflow, updateTextEllipsisStatus } =
  useTextEllipsis(false);

const text = ref('人生匆匆如流水，想来浮生似一梦。');
const onChangeText = (value: boolean) => {
  if (value) {
    text.value = '游戏人生，人生如戏。';
  } else {
    text.value = '人生匆匆如流水，想来浮生似一梦。';
  }

  nextTick(() => {
    updateTextEllipsisStatus();
  });
};
</script>

<template>
  <div class="flex">
    <!-- 这个block元素只能包含一个子inline元素，不然无法获取溢出状态 -->
    <div
      ref="textEllipsisRef"
      class="container ellipsis"
      @click="onChangeText(isOverflow)">
      <!-- 这个span可包含任意inline元素 -->
      <span>
        {{ text }}
      </span>
    </div>

    <div class="result">{{ isOverflow ? '显示了省略号' : '未显示省略号' }}</div>
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border: 1px dotted #ccc;
}
.container {
  width: 200px;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  user-select: none;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}

.result {
  color: #f00;
}
</style>
