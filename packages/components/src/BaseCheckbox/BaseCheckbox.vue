<script lang="ts" setup>
withDefaults(
  defineProps<{
    name?: string;
    data: { label: string; value: string; disabled?: boolean }[];
    layout?: 'horizontal' | 'vertical';
  }>(),
  {
    name: 'checkbox-' + Math.random().toString(36).substring(2),
    layout: 'horizontal'
  }
);

const checkedValue = defineModel<string[]>('modelValue', { default: [] });
const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.tagName !== 'INPUT') {
    return;
  }

  const { value, checked } = target;
  if (checked) {
    checkedValue.value = [...checkedValue.value, value];
    return;
  }
  checkedValue.value = checkedValue.value.filter((item) => item !== value);
};
</script>

<template>
  <div
    class="checkbox-wrapper"
    :class="{
      'checkbox-wrapper--horizontal': layout === 'horizontal',
      'checkbox-wrapper--vertical': layout === 'vertical'
    }"
    @click="onChange">
    <div
      v-for="(item, index) in data"
      class="checkbox-item"
      :class="{
        'checkbox-item--disabled': item.disabled
      }">
      <input
        type="checkbox"
        class="inp-cbx"
        :name
        :id="`${name}-checkbox${index}`"
        :value="item.value"
        :disabled="item.disabled"
        :checked="checkedValue.includes(item.value)" />
      <label :for="`${name}-checkbox${index}`" class="cbx">
        <span>
          <svg viewBox="0 0 12 10" height="12px" width="12px">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <span>{{ item.label }}</span>
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$primary-color: #506eec;
$icon-color: #ffffff;
$border-color: #9098a9;

.checkbox-wrapper {
  display: flex;
}

.checkbox-wrapper--horizontal {
  .checkbox-item {
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.checkbox-wrapper--vertical {
  flex-direction: column;

  .checkbox-item {
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.checkbox-item--disabled {
  opacity: 0.3;

  .inp-cbx {
    cursor: not-allowed;
  }

  .cbx {
    cursor: not-allowed;
  }
}

.inp-cbx {
  display: none;
  visibility: hidden;

  &:checked + .cbx span:first-child {
    background: $primary-color;
    border-color: $primary-color;
    animation: wave 0.4s ease;
  }

  &:checked + .cbx span:first-child svg {
    stroke-dashoffset: 0;
  }

  &:checked + .cbx span:first-child:before {
    transform: scale(3.5);
    opacity: 0;
    transition: all 0.6s ease;
  }
}

.cbx {
  margin: auto;
  user-select: none;
  cursor: pointer;

  span {
    display: inline-block;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
  }

  span:first-child {
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 3px;
    transform: scale(1);
    vertical-align: middle;
    border: 1px solid $border-color;
    transition: all 0.2s ease;

    svg {
      position: absolute;
      top: 3px;
      left: 2px;
      fill: none;
      stroke: $icon-color;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 16px;
      stroke-dashoffset: 16px;
      transition: all 0.3s ease;
      transition-delay: 0.1s;
      transform: translate3d(0, 0, 0);
    }

    &:before {
      content: '';
      width: 100%;
      height: 100%;
      background: $primary-color;
      display: block;
      transform: scale(0);
      opacity: 1;
      border-radius: 50%;
    }
  }

  &:hover span:first-child {
    border-color: $primary-color;
  }

  span:last-child {
    padding-left: 8px;
  }
}

@keyframes wave {
  50% {
    transform: scale(0.9);
  }
}
</style>
