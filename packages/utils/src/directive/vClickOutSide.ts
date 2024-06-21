import type { App } from 'vue';

export const vClickOutSide = (app: App) => {
  app.directive('click-outside', {
    beforeMount(el, binding) {
      el.clickOutsideEvent = function (event: MouseEvent) {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
      document.body.removeEventListener('click', el.clickOutsideEvent);
    }
  });
};
