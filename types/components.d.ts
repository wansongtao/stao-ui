// For this project development
import '@vue/runtime-core';

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    FileSelector: typeof import('../packages/components/FileSelector');
  }
}

export {};
