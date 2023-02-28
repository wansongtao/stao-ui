// For this project development
import '@vue/runtime-core';

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    STaoFileSelector: typeof import('../packages/components')['STaoFileSelector'];
  }
}

export {};
