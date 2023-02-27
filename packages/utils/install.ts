import type { Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T = any>(main: SFCWithInstall<T>, name: string) => {
  main.install = (app): void => {
    app.component(name, main);
  };
  return main;
};
