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
    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '/guide/' },
      {
        text: '组件',
        link: '/components/button/',
        activeMatch: '/components/'
      },
      { text: '函数', link: '/utils/common/', activeMatch: '/utils/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wansongtao/stao-ui' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/quickStart' },
            { text: '安装', link: '/guide/installation' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button/' },
            { text: 'FileSelector 文件选择', link: '/components/upload/' },
            {
              text: 'TextEllipsis 文本省略',
              link: '/components/textellipsis/'
            },
            { text: 'Tabs 标签页', link: '/components/tabs/' },
            { text: 'DatePanel 日期面板', link: '/components/datepanel/' },
            { text: 'Carousel 轮播图', link: '/components/carousel/' },
            { text: 'CodeForm 二维码表单', link: '/components/code-form/' },
          ]
        },
        {
          text: '其他组件',
          items: [
            { text: 'VueAMap 地图', link: '/components/other/vuemap/' },
          ]
        },
        {
          text: 'echarts组件',
          items: [
            { text: 'PieChart 饼图', link: '/components/echarts/pie/' },
            { text: 'LineChart 折线图', link: '/components/echarts/line/' },
          ]
        },
        {
          text: 'antd组件',
          items: [{ text: '确认对话框', link: '/components/antd/modal/' }]
        },
        {
          text: 'elementPlus组件',
          items: [
            { text: 'ButtonConfirm 确认按钮', link: '/components/element-plus/confirm-btn/' }
          ]
        }
      ],
      '/utils/': [
        {
          text: '函数',
          items: [
            { text: '常用方法', link: '/utils/common/' },
            { text: '特殊方法', link: '/utils/feature/' },
            { text: 'websocket', link: '/utils/websocket/' },
            { text: 'exceljs', link: '/utils/exceljs/' },
            { text: 'vosk 语音识别', link: '/utils/vosk/' },
            { text: 'CSS', link: '/utils/css/' }
          ]
        },
        {
          text: 'hooks',
          items: [
            { text: 'useTextEllipsis', link: '/utils/hooks/useTextEllipsis/' },
            { text: 'useTabsHistory', link: '/utils/hooks/useTabsHistory/' },
            { text: 'useElTableSelection', link: '/utils/hooks/useElTableSelection/' },
          ]
        },
        {
          text: '已发布库',
          items: [
            {
              text: 'number2chinesenumber',
              link: '/utils/library/chinesenumber/'
            },
            { text: 'web-storage-plus', link: '/utils/library/storage/' }
          ]
        }
      ]
    }
  },
  base: '/stao-ui/'
};

export default config;
