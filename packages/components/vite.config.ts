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
      outputDir: 'dist',
      tsConfigFilePath: '../../tsconfig.json'
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'StaoUi',
      fileName: 'stao-ui'
    },
    rollupOptions: {
      external: ['vue', 'ant-design-vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
      // output: [
      //   {
      //     format: 'es',
      //     entryFileNames: '[name].js',
      //     preserveModules: true,
      //     dir: 'es',
      //     preserveModulesRoot: './'
      //   },
      //   {
      //     format: 'cjs',
      //     entryFileNames: '[name].js',
      //     preserveModules: true,
      //     dir: 'lib',
      //     preserveModulesRoot: './'
      //   }
      // ]
    }
  }
});
