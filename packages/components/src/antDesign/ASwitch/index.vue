<script lang="ts" generic="T = unknown" setup>
import { Switch as ASwitch } from 'ant-design-vue';
import { type Slot } from 'vue';

type checkType = boolean | string | number;

const $props = withDefaults(
  defineProps<{
    checked?: boolean;
    checkedChildren?: string | Slot;
    checkedValue?: checkType;
    unCheckedChildren?: string | Slot;
    unCheckedValue?: checkType;
    disabled?: boolean;
    autoFocus?: boolean;
    loading?: boolean;
    size?: 'small' | 'default';
    data?: T;
  }>(),
  {
    checked: false,
    checkedChildren: '',
    checkedValue: true,
    unCheckedChildren: '',
    unCheckedValue: false,
    disabled: false,
    autoFocus: false,
    loading: false,
    size: 'default'
  }
);

const $emit = defineEmits<{
  (e: 'update:checked', value: checkType): void;
  (e: 'change', data: { checked: checkType; data?: T; e: Event }): void;
  (e: 'click', data: { checked: checkType; data?: T; e: Event }): void;
}>();

const handleChange = (value: checkType, e: Event) => {
  $emit('update:checked', value);
  $emit('change', { checked: value, data: $props.data, e });
};

const handleClick = (value: checkType, e: Event) => {
  $emit('click', { checked: value, data: $props.data, e });
};
</script>

<template>
  <div class="base-switch">
    <a-switch
      :checked="checked"
      :checked-children="checkedChildren"
      :checked-value="checkedValue"
      :un-checked-children="unCheckedChildren"
      :un-checked-value="unCheckedValue"
      :autofocus="autoFocus"
      :disabled="disabled"
      :loading="loading"
      :size="size"
      @change="handleChange"
      @click="handleClick" />
  </div>
</template>

<style lang="scss" scoped></style>
