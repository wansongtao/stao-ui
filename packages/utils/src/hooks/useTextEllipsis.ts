import { ref, onMounted, onBeforeUnmount } from 'vue';

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
export default function useTextEllipsis(isAutoUpdate = true) {
  const textEllipsisRef = ref<HTMLElement | null>(null);
  const isOverflow = ref(false);
  const updateTextEllipsisStatus = () => {
    if (!textEllipsisRef.value) {
      return;
    }

    const element = textEllipsisRef.value;
    isOverflow.value = checkEllipsis(element);
  };

  let observer: MutationObserver | null = null;
  onMounted(() => {
    if (isAutoUpdate) {
      observer = new MutationObserver(updateTextEllipsisStatus);
      observer.observe(textEllipsisRef.value!, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    updateTextEllipsisStatus();
  });

  if (isAutoUpdate) {
    onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    });
  }

  return {
    textEllipsisRef,
    isOverflow,
    updateTextEllipsisStatus
  };
}
