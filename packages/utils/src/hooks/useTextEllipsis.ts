import { ref, onMounted, onScopeDispose } from 'vue';

const getPadding = (el: HTMLElement) => {
  const style = window.getComputedStyle(el, null);
  const paddingLeft = Number.parseInt(style.paddingLeft, 10) || 0;
  const paddingRight = Number.parseInt(style.paddingRight, 10) || 0;
  const paddingTop = Number.parseInt(style.paddingTop, 10) || 0;
  const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0;
  return {
    left: paddingLeft,
    right: paddingRight,
    top: paddingTop,
    bottom: paddingBottom
  };
};

const checkEllipsis = (el: HTMLElement) => {
  const { left, right } = getPadding(el);
  const childElement = el.children[0] as HTMLElement;
  if (!childElement) {
    return false;
  }

  const childElementWidth = left + right + childElement.offsetWidth;
  return el.clientWidth <= childElementWidth;
};

/**
 * 文本是否溢出（创建block元素来包裹inline元素）
 * @param isAutoUpdate dom变化后是否自动更新状态（MutationObserver），默认为true
 * @returns
 */
export const useTextEllipsis = (isAutoUpdate = true) => {
  const blockRef = ref<HTMLElement | null>(null);
  const isEllipsis = ref(false);
  const updateStatus = () => {
    if (!blockRef.value) {
      return;
    }

    const element = blockRef.value;
    isEllipsis.value = checkEllipsis(element);
  };

  let observer: MutationObserver | null = null;
  onMounted(() => {
    if (isAutoUpdate) {
      observer = new MutationObserver(updateStatus);
      observer.observe(blockRef.value!, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    updateStatus();
  });

  onScopeDispose(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });

  return {
    blockRef,
    isEllipsis,
    updateStatus
  };
};
