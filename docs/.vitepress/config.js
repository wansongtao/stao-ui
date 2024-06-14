import { resolve } from 'path';

/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  title: 'STao UI',
  lastUpdated: true,
  lang: 'zh-CN',
  themeConfig: {
    search: {
      provider: 'algolia',
      options: {
        appId: 'F3YRIXSJG1',
        apiKey: 'ece1f73ceff1e9fdbb88b45aa83b3ce2',
        indexName: 'stao-ui',
        placeholder: '请输入关键词',
        translations: {
          button: {
            buttonText: '搜索'
          }
        }
      }
    },
    lastUpdatedText: '最后更新时间',
    docsDir: 'docs',
    outlineTitle: '这一页',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present wansongtao'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wansongtao/stao-ui' }
    ],
    nav: [
      { text: '指南', link: '/guide/quickStart', activeMatch: '/guide/' },
      {
        text: '组件',
        link: '/components/button/',
        activeMatch: '/components/'
      },
      { text: '工具', link: '/utils/common/main/', activeMatch: '/utils/' },
      { text: '库', link: '/library/chinesenumber/', activeMatch: '/library/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [{ text: '快速开始', link: '/guide/quickStart' }]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button/' },
            { text: 'FileSelector 文件选择', link: '/components/file/' },
            { text: 'Switch 开关', link: '/components/switch/' },
          ]
        },
        {
          text: '特殊组件',
          items: [
            { text: 'VueAMap 地图', link: '/components/other/vuemap/' },
            { text: 'AliPayForm', link: '/components/other/alipay-code/' },
          ]
        }
      ],
      '/utils/': [
        {
          text: '基础工具',
          items: [
            { text: '常用方法', link: '/utils/common/main/' },
            { text: '特殊方法', link: '/utils/common/special/' },
            { text: '事件总线', link: '/utils/common/event-bus/' },
            { text: '获取项目版本', link: '/utils/common/version/' }
          ]
        },
        {
          text: '常用插件',
          items: [
            { text: 'Axios', link: '/utils/plugins/axios/' },
            { text: 'ExcelJS', link: '/utils/plugins/exceljs/' },
          ]
        },
        {
          text: 'hooks',
          items: [
            { text: 'useURLQuery', link: '/utils/hooks/use-query/' },
            { text: 'useRequest', link: '/utils/hooks/use-request/' },
          ]
        }
      ],
      '/library/': [
        {
          text: 'npm 库',
          items: [
            {
              text: 'number2chinesenumber',
              link: '/library/chinesenumber/'
            },
            { text: 'web-storage-plus', link: '/library/storage/' }
          ]
        }
      ]
    }
  },
  base: '/stao-ui/',
  vite: {
    server: {
      open: true
    },
    resolve: {
      alias: {
        // 设置别名
        '@': resolve(__dirname, '../../packages/components/src'),
        '@utils': resolve(__dirname, '../../packages/utils/src')
      }
    }
  }
};

export default config;
