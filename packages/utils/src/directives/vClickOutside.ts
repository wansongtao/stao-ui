import type { App, DirectiveBinding } from 'vue';

export const vClickOutside = {
  beforeMount(el: any, binding: DirectiveBinding) {
    el.clickOutsideEvent = function (event: MouseEvent) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: any) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
};

export const clickOutsideInstall = (app: App) => {
  app.directive('click-outside', vClickOutside);
};
