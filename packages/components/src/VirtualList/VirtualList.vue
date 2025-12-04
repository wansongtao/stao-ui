<script lang="ts" generic="T" setup>
import { throttle } from '@utils/common';
import { useVirtualList } from './hooks/use-virtual-list';
import { computed, onMounted, useTemplateRef, watch } from 'vue';
import { useResizeObserver } from './hooks/use-resize-observer';

const {
  dataList,
  itemHeight,
  overscan = 5,
  hiddenScrollbar = false,
  scrollThrottleTime = 16
} = defineProps<{
  dataList: T[];
  getItemKey: (item: T) => string | number | void;
  containerHeight: string;
  itemHeight: number;
  overscan?: number;
  containerStyle?: string;
  itemStyle?: string;
  hiddenScrollbar?: boolean;
  scrollThrottleTime?: number;
}>();
const $emits = defineEmits<{
  contextmenu: [e: MouseEvent];
  rowClick: [data: T, index: number];
  scroll: [e: Event];
  change: [data: T[], beginIndex: number, endIndex: number];
}>();

const virtualListRef = useTemplateRef('virtual-list');
const handleScroll = (options?: ScrollToOptions) => {
  virtualListRef.value?.scroll(options);
};
const handleScrollTo = (index: number) => {
  if (!virtualListRef.value) {
    return;
  }

  const height = virtualListRef.value.clientHeight;
  const scrollHeight = virtualListRef.value.scrollHeight;
  if (height < scrollHeight) {
    let top = itemHeight * (index - 1);
    if (top < 0) {
      top = 0;
    }

    const scrollTop = virtualListRef.value.scrollTop;
    if (top <= scrollTop || top >= scrollTop + height) {
      virtualListRef.value.scrollTop = top;
    }
  }
};

const scrollHeight = computed(() => {
  return dataList.length * itemHeight;
});

const { renderRange, topHeight, setRenderRange, pagesize } = useVirtualList(
  virtualListRef,
  {
    itemHeight,
    overscan
  }
);

const visibleList = computed(() => {
  return dataList.slice(
    renderRange.value.beginIndex,
    renderRange.value.endIndex + 1
  );
});

watch(
  renderRange,
  (range) => {
    $emits(
      'change',
      dataList.slice(range.beginIndex, range.endIndex + 1),
      range.beginIndex,
      range.endIndex
    );
  },
  { deep: true, immediate: true }
);

watch(
  () => dataList,
  (data) => {
    if (dataList.length >= pagesize.value) {
      setRenderRange(data.length);
      return;
    }

    virtualListRef.value?.scrollTo({ top: 0, behavior: 'instant' });
  },
  { immediate: true, deep: true }
);

const handleContextmenu = (event: MouseEvent) => {
  event.preventDefault();
  $emits('contextmenu', event);
};
const handleRowClick = (data: T, index: number) => {
  $emits('rowClick', data, index);
};
const handleVirtualListScroll = throttle<Event>(
  (e) => {
    setRenderRange();
    $emits('scroll', e);
  },
  scrollThrottleTime,
  { leading: true, trailing: true }
);

onMounted(() => {
  if (virtualListRef.value) {
    pagesize.value = Math.floor(virtualListRef.value.clientHeight / itemHeight);
  }

  setRenderRange();
});

useResizeObserver(virtualListRef, () => {
  if (!virtualListRef.value) {
    return;
  }

  const size = Math.floor(virtualListRef.value.clientHeight / itemHeight);
  if (size === pagesize.value) {
    return;
  }
  pagesize.value = size;
  setRenderRange();
});

defineExpose({
  handleScroll,
  handleScrollTo
});
</script>

<template>
  <div
    ref="virtual-list"
    class="virtual-list"
    :class="{ 'virtual-list--hidden-scrollbar': hiddenScrollbar }"
    :style="`height: ${containerHeight};` + containerStyle"
    @contextmenu="handleContextmenu"
    @scroll="handleVirtualListScroll">
    <div :style="`height: ${scrollHeight}px; min-height: ${containerHeight};`">
      <div v-if="visibleList.length" :style="`height: ${topHeight}px;`"></div>
      <template
        v-for="(item, itemIndex) in visibleList"
        :key="getItemKey(item) ?? itemIndex">
        <div
          :style="`height: ${itemHeight}px; ${itemStyle}`"
          class="virtual-list__item"
          @click="handleRowClick(item, itemIndex + renderRange.beginIndex)">
          <slot :item="item" :itemIndex="itemIndex + renderRange.beginIndex" />
        </div>
      </template>
      <template v-if="!visibleList.length">
        <slot name="empty" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.virtual-list {
  overflow-y: auto;
  width: 100%;

  .virtual-list__item {
    position: relative;
    box-sizing: border-box;
  }
}

.virtual-list--hidden-scrollbar {
  scrollbar-width: none; /* 适用于 Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
