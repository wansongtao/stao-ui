module.exports = {
  title: 'STao UI',
  themeConfig: {
    lastUpdated: '最后更新时间',
    docsDir: 'docs',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present wansongtao'
    },
    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '/guide/' },
      { text: '组件', link: '/components/button/', activeMatch: '/components/' },
      { text: '方法库', link: '/utils/common/', activeMatch: '/utils/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wansongtao/stao-ui' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickStart' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: '按钮', link: '/components/button/' },
            { text: '文件选择', link: '/components/upload/' }
          ]
        }
      ]
    }
  },
  server: {
    open: true
  },
  base: '/stao-ui/'
};
