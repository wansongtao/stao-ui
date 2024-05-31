<script lang="ts" setup>
defineProps<{
  type?: 'primary' | 'outline';
  status?: 'default' | 'danger';
  disabled?: boolean;
}>();
</script>

<template>
  <button
    name="button"
    type="button"
    autocomplete="off"
    class="base-button"
    :class="{
      'base-button--primary': type === 'primary' || !type,
      'base-button--outline': type === 'outline',
      'base-button--danger': status === 'danger',
      'base-button--disabled': disabled
    }">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
$primary-color: #2f54eb;
$primary-color-hover: #597ef7;
$primary-color-disabled: #9dbefa;
$danger-color: #f5222d;
$danger-color-hover: #d4380d;
$danger-color-disabled: #fa8c96;

.base-button {
  all: unset;
  box-sizing: border-box;
  padding: 8px 12px;
  width: 100%;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
}

.base-button--primary {
  background: $primary-color;
  color: #fff;

  &:hover, &:focus {
    background-color: $primary-color-hover;
  }

  &.base-button--disabled {
    background-color: $primary-color-disabled;
  }

  &.base-button--danger {
    background-color: $danger-color;

    &:hover, &:focus {
      background-color: $danger-color-hover;
    }

    &.base-button--disabled {
      background-color: $danger-color-disabled;
    }
  }
}

.base-button--outline {
  color: $primary-color;
  background: #fff;
  border: 1px solid $primary-color;

  &:hover, &:focus {
    border-color: $primary-color-hover;
    color: $primary-color-hover;
    background-color: transparent;
  }

  &.base-button--disabled {
    border-color: $primary-color-disabled;
    color: $primary-color-disabled;
  }

  &.base-button--danger {
    border-color: $danger-color;
    color: $danger-color;

    &:hover, &:focus {
      border-color: $danger-color-hover;
      color: $danger-color-hover;
    }

    &.base-button--disabled {
      border-color: $danger-color-disabled;
      color: $danger-color-disabled;
    }
  }
}

.base-button--disabled {
  cursor: not-allowed;
}
</style>