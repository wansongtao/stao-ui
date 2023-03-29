<script lang="ts" setup>
defineProps<{
  type?: 'default' | 'line';
  text: string;
}>();
const emits = defineEmits<{
  (e: 'onClick'): void;
}>();

const onClick = () => {
  emits('onClick');
};
</script>

<template>
  <button
    class="button_box flex_center"
    :class="type === 'line' ? 'line' : ''"
    @click="onClick">
    <div class="button_box_icon">
      <slot> </slot>
    </div>
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>
.button_box {
  box-sizing: border-box;
  margin-right: 16px;
  padding: 0;
  width: 200px;
  height: 48px;
  background: #2f54eb;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  color: #fff;
  cursor: pointer;

  .button_box_icon {
    overflow: hidden;
    margin-right: 4px;
    width: 18px;
    height: 18px;
  }
}

.line {
  color: #2f54eb;
  background: #fff;
  border: 1px solid #2f54eb;
}
</style>
