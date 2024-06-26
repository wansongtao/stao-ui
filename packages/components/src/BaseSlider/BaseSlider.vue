<script lang="ts" setup>
import { computed } from 'vue';

const $props = withDefaults(
  defineProps<{
    modelValue?: number;
    color?: string;
    trackColor?: string;
    width?: string;
    strokeWidth?: string;
    showText?: boolean;
    textColor?: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
  }>(),
  {
    color: '#525252',
    trackColor: '#e5e6eb',
    width: '100%',
    strokeWidth: '6px',
    showText: true,
    textColor: '#525252',
    min: 0,
    max: 100,
    step: 1,
    disabled: false
  }
);

const $emits = defineEmits<{
  'update:modelValue': [value: number];
}>();
const level = computed({
  get: () => {
    return $props.modelValue ?? 0;
  },
  set: (value: number) => {
    $emits('update:modelValue', +value);
  }
});
</script>

<template>
  <div class="slider">
    <input type="range" class="level" v-model="level" :min :max :step :disabled />
    <div class="slider-text" v-if="showText">{{ level }}</div>
  </div>
</template>

<style lang="scss" scoped>
.slider {
  display: flex;
  align-items: center;

  .level {
    overflow: hidden;
    appearance: none;
    width: v-bind(width);
    height: v-bind(strokeWidth);
    background-color: v-bind(trackColor);
    border-radius: 99px;
    cursor: pointer;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 0;
      height: 0;
      box-shadow: -100vw 0 0 100vw v-bind(color);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }
  }

  .slider-text {
    overflow: hidden;
    margin-left: 5px;
    width: 42px;
    font-size: 14px;
    color: v-bind(textColor);
  }
}
</style>
