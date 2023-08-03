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
      { text: '组件', link: '/components/button/', activeMatch: '/components/' }
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
          items: [{ text: 'Button', link: '/components/button/' }]
        }
      ]
    }
  },
  server: {
    open: true
  },
  base: '/stao-ui/'
};
