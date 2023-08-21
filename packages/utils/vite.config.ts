import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      outputDir: 'dist/types',
      tsConfigFilePath: '../../tsconfig.json'
    })
  ],
  build: {
    target: 'es2015',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'utils',
      fileName: 'stao-ui-utils'
    },
    rollupOptions: {
      external: ['vue', 'ant-design-vue', 'exceljs', 'file-saver', 'element-plus']
    }
  }
});
