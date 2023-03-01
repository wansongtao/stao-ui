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
      tsConfigFilePath: '../../tsconfig.json'
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './index.ts')
    },
    rollupOptions: {
      external: ['vue', 'ant-design-vue'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'dist/es',
          preserveModulesRoot: './'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'dist/lib',
          preserveModulesRoot: './'
        }
      ]
    }
  }
});
