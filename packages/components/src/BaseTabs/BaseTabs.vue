<script lang="ts" setup>
import { computed } from 'vue';

const $props = withDefaults(
  defineProps<{
    name?: string;
    tabs: { label: string; value: string; dot?: string | number }[];
  }>(),
  {
    name: 'tabs-' + Math.random().toString(36).substring(2)
  }
);

const checkedValue = defineModel<string>();
const onChangeTab = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.tagName === 'INPUT') {
    checkedValue.value = target.value;
  }
};

const gliderStyle = computed(() => {
  const index = $props.tabs.findIndex(
    (item) => item.value == checkedValue.value
  );
  if (index === -1) {
    return {
      opacity: 0
    };
  }

  return {
    transform: `translateX(${index * 100}%)`
  };
});
</script>

<template>
  <div class="tabs" @click="onChangeTab">
    <template v-for="(item, index) in tabs">
      <input
        type="radio"
        :id="`${name}-radio${index}`"
        :name
        :value="item.value"
        :checked="checkedValue === item.value" />
      <label class="tab" :for="`${name}-radio${index}`">
        {{ item.label }}
        <span class="notification" v-if="item.dot">{{ item.dot }}</span>
      </label>
    </template>
    <span class="glider" :style="gliderStyle"></span>
  </div>
</template>

<style lang="scss" scoped>
@mixin item {
  padding: 2px 4px;
  height: 30px;
  width: 50px;
  border-radius: 17px;
}

$color-light: #185ee0;
$color: #e6eef9;

.tabs {
  display: flex;
  background-color: #fff;
  box-shadow: 0 0 1px 0 rgba(24, 94, 224, 0.15),
    0 6px 12px 0 rgba(24, 94, 224, 0.15);
  padding: 10px;
  border-radius: 99px;
}

.tabs * {
  z-index: 2;
}

.tabs input[type='radio'] {
  display: none;
}

.tab {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @include item;
  font-size: 0.8rem;
  color: #000;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.15s ease-in;
}

.notification {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  top: -2px;
  right: 2px;
  font-size: 10px;
  border-radius: 50%;
  margin: 0px;
  background-color: $color;
  transition: 0.15s ease-in;
}

.tabs input[type='radio']:checked + label {
  color: $color-light;
}

.tabs input[type='radio']:checked + label > .notification {
  background-color: $color-light;
  color: #fff;
  margin: 0px;
}

.glider {
  position: absolute;
  display: flex;
  @include item;
  background-color: $color;
  z-index: 1;
  transition: 0.25s ease-out;
}
</style>
