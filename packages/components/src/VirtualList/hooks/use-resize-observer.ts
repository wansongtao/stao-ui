import { onMounted, onScopeDispose, type ShallowRef } from 'vue';

export const useResizeObserver = (
  element: ShallowRef<HTMLDivElement | null>,
  callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void,
  options?: ResizeObserverOptions
) => {
  let resizeObserver: ResizeObserver | null = null;
  onMounted(() => {
    if (element.value) {
      resizeObserver = new ResizeObserver(callback);
      resizeObserver.observe(element.value, options);
    }
  });

  onScopeDispose(() => {
    resizeObserver?.disconnect();
    resizeObserver = null;
  });
};
