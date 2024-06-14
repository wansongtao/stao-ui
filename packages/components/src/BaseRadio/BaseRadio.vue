<script lang="ts" setup>
withDefaults(
  defineProps<{
    name?: string;
    data: { label: string; value: string; disabled?: boolean }[];
    layout?: 'horizontal' | 'vertical';
  }>(),
  {
    name: 'radio-' + Math.random().toString(36).substring(2),
    layout: 'horizontal'
  }
);

const checkedValue = defineModel<string>();
const onChangeTab = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.tagName === 'INPUT') {
    checkedValue.value = target.value;
  }
};
</script>

<template>
  <div
    class="radio-button-container"
    :class="{ vertical: layout === 'vertical' }"
    @click="onChangeTab">
    <div v-for="(item, index) in data" class="radio-button" :key="index">
      <input
        type="radio"
        class="radio-button__input"
        :id="`${name}-item${index}`"
        :name
        :value="item.value"
        :disabled="item.disabled"
        :checked="checkedValue === item.value" />
      <label class="radio-button__label" :for="`${name}-item${index}`">
        <span class="radio-button__custom"></span>
        {{ item.label }}
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin transition {
  transition: all 0.4s ease;
}

$active-color: #4c8bf5;
$inactive-color: #333;
$disabled-color: #ccc;

.radio-button-container {
  display: flex;
  align-items: center;
  gap: 24px;
}

.vertical {
  flex-direction: column;
}

.radio-button {
  position: relative;
}

.radio-button__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:checked {
    & + .radio-button__label .radio-button__custom {
      border-color: $active-color;

      &::after {
        background-color: $active-color;
      }
    }

    & + .radio-button__label {
      color: $active-color;
    }
  }

  &:disabled {
    & + .radio-button__label {
      color: $disabled-color;
      cursor: not-allowed;
    }

    & + .radio-button__label .radio-button__custom {
      border-color: $disabled-color;
    }
  }
}

.radio-button__label {
  display: inline-block;
  position: relative;
  padding-left: 30px;
  font-size: 16px;
  color: $inactive-color;
  user-select: none;
  cursor: pointer;
  @include transition;

  .radio-button__custom {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid $inactive-color;
    @include transition;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: transparent;
      @include transition;
    }
  }

  &:hover {
    color: $active-color;

    .radio-button__custom {
      border-color: $active-color;
    }
  }
}
</style>
