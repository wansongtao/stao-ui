<script lang="ts" setup>
import { Tooltip } from 'ant-design-vue';
import { ref } from 'vue';
import { useTextEllipsis } from '@utils/hooks/useTextEllipsis';

const { blockRef, isEllipsis } = useTextEllipsis();
const text = ref('千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。');

const onChangeText = () => {
  if (text.value.length > 20) {
    text.value = '大梦一场三百年，人生几度梦中看。';
  } else {
    text.value = '千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。';
  }
};
</script>

<template>
  <div class="text" @click="onChangeText">点我改变文本内容</div>
  <div class="container">
    <tooltip>
      <template v-if="isEllipsis" #title>{{ text }}</template>
      <div ref="blockRef" class="ellipsis">
        <span>{{ text }}</span>
      </div>
    </tooltip>
  </div>
</template>

<style lang="scss" scoped>
.text {
  margin-bottom: 10px;
  cursor: pointer;
  color: #1890ff;
}

.container {
  width: 300px;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
</style>
