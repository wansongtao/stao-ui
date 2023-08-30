import { ref, onMounted, onScopeDispose } from 'vue';

const useResizeObserver = <T extends Element | SVGElement>(
  callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void,
  options?: ResizeObserverOptions
) => {
  const element = ref<T | null>(null);
  const resizeObserver = new ResizeObserver(callback);

  onMounted(() => {
    if (element.value) {
      resizeObserver.observe(element.value, options);
    }
  });

  onScopeDispose(() => {
    resizeObserver.disconnect();
  });

  return {
    element,
    resizeObserver
  };
};

export default useResizeObserver;
