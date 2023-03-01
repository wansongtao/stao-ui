import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      outputDir: 'es',
      tsConfigFilePath: '../../tsconfig.json'
    }),
    dts({
      outputDir: 'lib',
      tsConfigFilePath: '../../tsconfig.json'
    })
  ],
  build: {
    target: 'modules',
    lib: {
      entry: resolve(__dirname, './index.ts')
    },
    rollupOptions: {
      external: ['vue', 'ant-design-vue'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          dir: 'es'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          dir: 'lib'
        }
      ]
    }
  }
});
