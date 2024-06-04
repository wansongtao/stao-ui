<script lang="ts" generic="T extends (string | number | boolean)" setup>
import { computed } from 'vue';

const $props = withDefaults(
  defineProps<{
    disabled?: boolean;
    activeValue?: T;
    inactiveValue?: T;
    activeText?: string;
    inactiveText?: string;
    activeColor?: string;
    activeBgColor?: string;
    inactiveColor?: string;
    inactiveBgColor?: string;
    textColor?: string;
  }>(),
  {
    disabled: false,
    activeText: 'YES',
    inactiveText: 'NO',
    activeColor: '#03a9f4',
    activeBgColor: '#ebf7fc',
    inactiveColor: '#f44336',
    inactiveBgColor: '#fcebeb',
    textColor: '#fff'
  }
);

const checked = defineModel<T>('checked', { default: false as T });
const nativeChecked = computed({
  get: () => {
    if ($props.activeValue) {
      return checked.value === $props.activeValue;
    }
    if ($props.inactiveValue) {
      return checked.value !== $props.inactiveValue;
    }
    return !!checked.value;
  },
  set: (value: boolean) => {
    if ($props.disabled) return;

    if (value) {
      checked.value = $props.activeValue ?? (true as T);
      return;
    }
    checked.value = $props.inactiveValue ?? (false as T);
  }
});
</script>

<template>
  <div class="base-switch-button">
    <input
      class="base-switch-checkbox"
      type="checkbox"
      v-model="nativeChecked" />
    <div
      class="knobs"
      :class="disabled ? 'knobs--disabled' : ''"
      :data-text="nativeChecked ? activeText : inactiveText"></div>
    <div class="layer"></div>
  </div>
</template>

<style lang="scss" scoped>
.base-switch-button {
  overflow: hidden;
  position: relative;
  width: 74px;
  height: 36px;
  border-radius: 18px;
  color: v-bind(textColor);

  .base-switch-checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .knobs:before {
    content: attr(data-text);
    position: absolute;
    top: 50%;
    left: 6px;
    transform: translateY(-50%);
    padding: 5px 2px;
    width: 24px;
    height: 24px;
    font-size: 10px;
    text-align: center;
    line-height: 14px;
    background-color: v-bind(inactiveColor);
    border-radius: 15px;
    transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
  }

  .base-switch-checkbox:checked + .knobs:before {
    content: attr(data-text);
    left: 44px;
    background-color: v-bind(activeColor);
  }

  .base-switch-checkbox:checked ~ .layer {
    background-color: v-bind(activeBgColor);
  }
}

.knobs,
.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.knobs {
  z-index: 2;
}

.knobs--disabled {
  z-index: 4;
  cursor: not-allowed;
}

.layer {
  width: 100%;
  background-color: v-bind(inactiveBgColor);
  transition: 0.3s ease all;
  z-index: 1;
}
</style>
