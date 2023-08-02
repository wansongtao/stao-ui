import DefaultTheme from 'vitepress/theme';
import { STaoButton, STaoFileSelector } from '@stao-ui/components';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(STaoButton); // 在 vitepress 中,注册全局组件
    app.use(STaoFileSelector);
  }
};
