<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElButton } from 'element-plus';
import 'element-plus/es/components/message-box/style/css';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/button/style/css';

defineOptions({
  name: 'SElButtonConfirm'
});

const $props = withDefaults(
  defineProps<{
    buttonText?: string;
    title?: string;
    content?: string;
    type?: 'success' | 'info' | 'warning' | 'error';
    confirmButtonText?: string;
    cancelButtonText?: string;
  }>(),
  {
    buttonText: '删除',
    title: '警告',
    content: '此操作不可逆, 是否继续?',
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }
);
const emits = defineEmits(['handleConfirm', 'handleCancel']);

const onClick = () => {
  ElMessageBox.confirm($props.content, $props.title, {
    confirmButtonText: $props.confirmButtonText,
    cancelButtonText: $props.cancelButtonText,
    type: $props.type
  })
    .then(() => {
      emits('handleConfirm');
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作'
      });
      emits('handleCancel');
    });
};
</script>

<template>
  <el-button type="danger" @click="onClick">{{
    buttonText
  }}</el-button>
</template>

<style lang="scss" scoped></style>
