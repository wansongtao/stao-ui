import { computed, ref, type ShallowRef } from 'vue';

export const useVirtualList = (
  element: ShallowRef<HTMLDivElement | null>,
  {
    itemHeight,
    overscan = 5
  }: {
    itemHeight: number;
    overscan?: number;
  }
) => {
  const pagesize = ref(0);
  const renderRange = ref({
    beginIndex: 0,
    endIndex: 0
  });

  /**
   * 内容盒(渲染列表)上面的空容器高度
   */
  const topHeight = computed(() => {
    return renderRange.value.beginIndex * itemHeight;
  });

  const setRenderRange = (itemCount?: number) => {
    if (!element.value) {
      return;
    }

    const height = element.value.clientHeight;
    pagesize.value = Math.floor(height / itemHeight);

    const scrollTop = element.value.scrollTop;
    if (scrollTop === 0) {
      renderRange.value = {
        beginIndex: 0,
        endIndex: pagesize.value + overscan
      };
      return;
    }

    // 处理超出最大滚动高度的情况
    const maxScrollTop = (itemCount ?? 0) * itemHeight - height;
    if (itemCount && scrollTop >= maxScrollTop) {
      element.value?.scrollTo({ top: maxScrollTop, behavior: 'instant' });
      return;
    }

    const currentLine = Math.floor(scrollTop / itemHeight);
    renderRange.value.beginIndex = currentLine - overscan;
    if (renderRange.value.beginIndex < 0) {
      renderRange.value.beginIndex = 0;
    }
    renderRange.value.endIndex = currentLine + pagesize.value + overscan;
  };

  return {
    pagesize,
    renderRange,
    topHeight,
    setRenderRange
  };
};
