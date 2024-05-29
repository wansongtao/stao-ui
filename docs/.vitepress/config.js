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
            { text: 'FileSelector 文件选择', link: '/components/upload/' },
            { text: 'Switch 开关', link: '/components/switch/' },
            { text: 'TextScroll 文字滚动', link: '/components/text-scroll/' },
            { text: 'Carousel 轮播图', link: '/components/carousel/' },
            { text: 'CodeForm 二维码表单', link: '/components/code-form/' },
            {
              text: 'TextEllipsis 文本省略',
              link: '/components/textellipsis/'
            },
            { text: 'Tabs 标签页', link: '/components/tabs/' },
            { text: 'DatePanel 日期面板', link: '/components/datepanel/' }
          ]
        },
        {
          text: 'echarts组件',
          items: [
            { text: 'PieChart 饼图', link: '/components/echarts/pie/' },
            { text: 'LineChart 折线图', link: '/components/echarts/line/' }
          ]
        },
        {
          text: 'antd组件',
          items: [
            { text: '确认对话框', link: '/components/antd/modal/' },
            { text: 'Switch 开关', link: '/components/antd/base-switch/' },
            {
              text: 'CheckTransfer 多选穿梭框',
              link: '/components/antd/check-transfer/'
            }
          ]
        },
        {
          text: '特殊组件',
          items: [{ text: 'VueAMap 地图', link: '/components/other/vuemap/' }]
        }
      ],
      '/utils/': [
        {
          text: '常用工具',
          items: [
            { text: '常用函数', link: '/utils/common/main/' },
            { text: '冷门函数', link: '/utils/common/feature/' },
            { text: 'exceljs', link: '/utils/common/exceljs/' },
            { text: 'axios', link: '/utils/common/axios/' },
            { text: 'CSS', link: '/utils/common/css/' }
          ]
        },
        {
          text: '工具类',
          items: [{ text: 'Event Bus', link: '/utils/plugins/event/' }]
        },
        {
          text: 'hooks',
          items: [
            {
              text: 'useTextEllipsis',
              link: '/utils/hooks/use-text-ellipsis/'
            },
            {
              text: 'useResizeObserver',
              link: '/utils/hooks/use-resize-observer/'
            },
            {
              text: 'useIdleDetection',
              link: '/utils/hooks/use-idle-detection/'
            },
            {
              text: 'useURLQuery',
              link: '/utils/hooks/use-url-query/'
            },
            {
              text: 'usePagingRequest',
              link: '/utils/hooks/use-paging-request/'
            }
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
    }
  }
};

export default config;
