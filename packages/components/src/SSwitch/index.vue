<script lang="ts" setup>
import { ref, watch } from 'vue';
import { throttle } from '@stao-ui/utils';
import IconSun from '../icons/IconSun.vue';
import IconMoon from '../icons/IconMoon.vue';

const $props = withDefaults(
  defineProps<{ checked?: boolean; delay?: number }>(),
  {
    checked: false,
    delay: 0
  }
);

const $emit = defineEmits<{
  onChange: [isChecked: boolean];
  'update:checked': [isChecked: boolean];
}>();

const status = ref($props.checked);
watch(
  () => $props.checked,
  (val) => {
    if (val === status.value) return;
    status.value = val;
  }
);

const changeStatus = () => {
  status.value = !status.value;
  $emit('onChange', status.value);
  $emit('update:checked', status.value);
};
const handleChangeStatus = $props.delay
  ? throttle(changeStatus, $props.delay)
  : changeStatus;
</script>

<template>
  <button class="base-switch" :class="status ? 'base-switch--active' : ''" @click="handleChangeStatus">
    <span class="switch-check" :class="status ? 'switch-check--active' : ''">
      <span class="switch-icon">
        <slot :checked="status">
          <IconSun v-show="!status" />
          <IconMoon v-show="status" />
        </slot>
      </span>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.base-switch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid rgba(60, 60, 60, 0.1);
  background-color: #f1f1f1;
  transition: border-color 0.25s, background-color 0.25s;

  &:hover {
    border-color: #8e8e8e;
  }

  .switch-check {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    color: #213547;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
    transition: all 0.25s;
  }

  .switch-check--active {
    transform: translateX(18px);
    color: rgba(255, 255, 255, 0.87);
    background-color: #1a1a1a;
  }

  .vt-switch-icon {
    position: relative;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    overflow: hidden;
  }
}

.base-switch--active {
  background-color: #2f2f2f;
  border-color: rgba(84, 84, 84, 0.65);
}

.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.12em;
  fill: currentColor;
  overflow: hidden;
}
</style>
