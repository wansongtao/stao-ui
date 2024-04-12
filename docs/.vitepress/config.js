import markdownItKatex from 'markdown-it-katex';

const customElements = [
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mi',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'mscarries',
  'msgroup',
  'mstack',
  'mlongdiv',
  'msline',
  'mstack',
  'mspace',
  'msqrt',
  'msrow',
  'mstack',
  'mstack',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'math',
  'mi',
  'mn',
  'mo',
  'ms',
  'mspace',
  'mtext',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'msqrt',
  'mstyle',
  'mmultiscripts',
  'mover',
  'mprescripts',
  'msub',
  'msubsup',
  'msup',
  'munder',
  'munderover',
  'none',
  'maligngroup',
  'malignmark',
  'mtable',
  'mtd',
  'mtr',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'msline',
  'msrow',
  'mstack',
  'maction',
  'semantics',
  'annotation',
  'annotation-xml'
];

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
      { text: '工具', link: '/utils/common/main/', activeMatch: '/utils/' },
      {
        text: '算法',
        link: '/algorithm/bubble-sort/',
        activeMatch: '/algorithm/'
      }
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
            { text: 'Switch 开关', link: '/components/switch/' },
            {
              text: 'TextEllipsis 文本省略',
              link: '/components/textellipsis/'
            },
            { text: 'Tabs 标签页', link: '/components/tabs/' },
            { text: 'DatePanel 日期面板', link: '/components/datepanel/' },
            { text: 'Carousel 轮播图', link: '/components/carousel/' },
            { text: 'CodeForm 二维码表单', link: '/components/code-form/' }
          ]
        },
        {
          text: '其他组件',
          items: [{ text: 'VueAMap 地图', link: '/components/other/vuemap/' }]
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
          text: 'elementPlus组件',
          items: [
            {
              text: 'ButtonConfirm 确认按钮',
              link: '/components/element-plus/confirm-btn/'
            }
          ]
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
          items: [
            { text: 'Event Bus', link: '/utils/plugins/event/' }
          ]
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
            }
          ]
        },
        {
          text: '库',
          items: [
            {
              text: 'number2chinesenumber',
              link: '/utils/library/chinesenumber/'
            },
            { text: 'web-storage-plus', link: '/utils/library/storage/' }
          ]
        }
      ],
      '/algorithm/': [
        {
          text: '算法',
          items: [
            { text: '冒泡排序', link: '/algorithm/bubble-sort/' },
            { text: '选择排序', link: '/algorithm/selection-sort/' },
            { text: '插入排序', link: '/algorithm/insertion-sort/' },
            { text: '希尔排序', link: '/algorithm/shell-sort/' },
            { text: '归并排序', link: '/algorithm/merge-sort/' },
            { text: '快速排序', link: '/algorithm/quick-sort/' },
            { text: '计数排序', link: '/algorithm/counting-sort/' },
            { text: '桶排序', link: '/algorithm/bucket-sort/' },
            { text: '基数排序', link: '/algorithm/radix-sort/' },
            { text: '堆排序', link: '/algorithm/heap-sort/' }
          ]
        }
      ]
    }
  },
  markdown: {
    config: (md) => {
      md.use(markdownItKatex);
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag)
      }
    }
  },
  base: '/stao-ui/'
};

export default config;
