import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
    dts({
      outputDir: 'dist/es',
      entryRoot: 'dist',
      tsConfigFilePath: '../../tsconfig.json'
    })
  ],
  build: {
    target: 'es2015',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'stao-ui',
      // the proper extensions will be added
      fileName: (format, name) => {
        if (format === 'es') {
          return name + '.js';
        } else if (format === 'umd') {
          return name + '.umd.js';
        }

        return name + '.' + format + '.js';
      }
    },
    rollupOptions: {
      external: ['vue', 'ant-design-vue', '@stao-ui/utils'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
