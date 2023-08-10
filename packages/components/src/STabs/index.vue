<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

defineOptions({
  name: 'STabs'
});

const $emits = defineEmits<{
  onChange: [index: number];
  'update:activeId': [id: number | string];
}>();

export type ITabs = { id: number | string; name: string };
const $props = defineProps<{
  type?: 'default' | 'card';
  tabs: ITabs[];
  activeId?: number | string;
  /**
   * 被隐藏时是否销毁 DOM 结构
   */
  isDestroyChange?: boolean;
}>();

const activeIdx = ref(0);
const onChangeTab = (idx: number) => {
  activeIdx.value = idx;

  $emits('update:activeId', $props.tabs[idx].id);
  $emits('onChange', idx);
};

watch(
  () => $props.activeId,
  (id) => {
    if (id === undefined) {
      return;
    }

    const idx = $props.tabs.findIndex((item) => item.id === id);
    if (idx !== -1 && idx !== activeIdx.value) {
      activeIdx.value = idx;
    }
  },
  { immediate: true }
);

const tabsElement = ref<HTMLDivElement | null>(null);
const scrollTabs = (e: WheelEvent) => {
  e.preventDefault();
  if (tabsElement.value) {
    tabsElement.value.scrollLeft += e.deltaY * 0.2;
  }
};
onMounted(() => {
  if ($props.type !== 'card' && tabsElement.value) {
    const width = tabsElement.value.clientWidth;
    const scrollWidth = tabsElement.value.scrollWidth;

    if (scrollWidth !== width) {
      tabsElement.value.addEventListener('wheel', scrollTabs);
    }
  }
});

onBeforeUnmount(() => {
  tabsElement.value?.removeEventListener('wheel', scrollTabs);
});
</script>

<template>
  <div class="tabs" v-if="tabs && tabs.length">
    <div class="tabs_nav" :style="type === 'card' ? 'height: auto;' : ''">
      <div
        ref="tabsElement"
        :class="{
          'tabs_nav_list--card': type === 'card',
          tabs_nav_list: type !== 'card'
        }">
        <div
          v-for="(item, idx) in tabs"
          class="tabs_nav_item"
          :class="{ 'tabs_nav_item--active': activeIdx === idx }"
          :key="idx"
          @click="onChangeTab(idx)">
          <slot name="icon" :isActive="activeIdx === idx" :index="idx"></slot>
          <slot
            name="tab"
            :item="item"
            :index="idx"
            :isActive="activeIdx === idx"
            >{{ item.name }}</slot
          >
        </div>
      </div>

      <div class="divide" v-if="type !== 'card'"></div>
    </div>
    <div class="tabs_content">
      <template v-if="isDestroyChange">
        <template v-for="(item, index) in tabs" :key="index">
          <div class="tabs_content_item" v-if="activeIdx === index">
            <slot :item="item" :index="index"></slot>
          </div>
        </template>
      </template>
      <template v-else>
        <div
          class="tabs_content_item"
          v-for="(item, index) in tabs"
          :key="index"
          v-show="index === activeIdx">
          <slot :item="item" :index="index"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  width: 100%;

  .tabs_nav {
    position: relative;
    height: 32px;
  }

  .divide {
    position: absolute;
    left: 0;
    top: 30px;
    z-index: 0;
    width: 100%;
    height: 2px;
    border-radius: 50%;
    background-color: #dcdbdb;
  }
}

.tabs_nav_list {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 32px;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  align-items: center;

  &::-webkit-scrollbar {
    height: 0;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 2px;
  }

  .tabs_nav_item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 4px 12px;
    color: #333;
    cursor: pointer;
    border-bottom: 2px solid transparent;

    &:hover {
      color: #2f54eb;
    }
  }

  .tabs_nav_item--active {
    color: #2f54eb;
    border-color: #2f54eb;
  }
}

.tabs_nav_list--card {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .tabs_nav_item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 10px;
    margin-right: 12px;
    padding: 4px 12px;
    color: #333;
    border: 1px solid #d0d3d6;
    border-radius: 4px;
    cursor: pointer;
  }

  .tabs_nav_item--active {
    color: #2f54eb;
    background-color: #ebeefd;
    border-color: #ebeefd;
  }
}
</style>
