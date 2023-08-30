import { ref, onMounted, onScopeDispose } from 'vue';

const useResizeObserver = <T extends Element | SVGElement>(
  callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void
) => {
  const element = ref<T | null>(null);
  const resizeObserver = new ResizeObserver((entries, observer) => {
    callback(entries, observer);
  });

  onMounted(() => {
    if (element.value) {
      resizeObserver.observe(element.value);
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
