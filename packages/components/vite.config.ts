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
      outputDir: 'es',
      tsConfigFilePath: '../../tsconfig.json'
    }),
    //因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个
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
