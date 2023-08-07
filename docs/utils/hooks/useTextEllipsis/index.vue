<script lang="ts" setup>
import { useTextEllipsis } from '@stao-ui/utils';

const { textEllipsisRef, isOverflow } = useTextEllipsis();
</script>

<template>
  <div class="flex">

    <!-- 这个block元素只能包含一个子inline元素，不然无法获取溢出状态 -->
    <div
      ref="textEllipsisRef"
      class="container ellipsis"
      >
      <!-- 这个span可包含任意inline元素 -->
      <span>
        人生匆匆如流水，想来浮生似一梦。
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
  width: 300px;
  height: 32px;
  line-height: 32px;
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
