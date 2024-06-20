import { ref, onMounted, onScopeDispose } from 'vue';

export const useResizeObserver = <T extends Element | SVGElement>(
  callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void,
  options?: ResizeObserverOptions
) => {
  const element = ref<T | null>(null);
  let resizeObserver: ResizeObserver;

  onMounted(() => {
    resizeObserver = new ResizeObserver(callback);

    if (element.value) {
      resizeObserver.observe(element.value, options);
    }
  });

  onScopeDispose(() => {
    resizeObserver.disconnect();
  });

  return {
    element
  };
};
