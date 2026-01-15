import { defineConfig } from 'vitepress'
import type { PluginOption } from 'vite'
import { 
  GitChangelog, 
  GitChangelogMarkdownSection, 
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import {
  PageProperties,
  PagePropertiesMarkdownSection,
} from '@nolebase/vitepress-plugin-page-properties/vite'

export default defineConfig({
  vite: { 
    optimizeDeps: {
      exclude: [ 
        '@nolebase/vitepress-plugin-enhanced-readabilities/client', 
        'vitepress', 
        '@nolebase/ui', 
      ], 
    },
    ssr: { 
      noExternal: [ 
        // 如果还有别的依赖需要添加的话，并排填写和配置到这里即可
        '@nolebase/vitepress-plugin-highlight-targeted-heading', 
        '@nolebase/vitepress-plugin-enhanced-readabilities', 
        '@nolebase/ui', 
      ], 
    }, 
    plugins: [
      PageProperties(),
      PagePropertiesMarkdownSection({
        excludes: ['index.md'],
      }),
      
      GitChangelog({ 
        // 填写在此处填写您的仓库链接
        repoURL: () => 'https://github.com/asukaneko/vitepress-template', 
      }), 
      GitChangelogMarkdownSection({
        sections: {
          // 禁用页面历史
          disableChangelog: false,
          // 禁用贡献者
          disableContributors: true,
        },
      }) as any,
    ],
  }, 
  title: "VitePress 模板项目",
  description: "基于 VitePress 的通用文档模板",
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
  themeConfig: {
    docFooter: { 
      prev: '上一页', 
      next: '下一页', 
    }, 
    outline: { 
      level: [2,4], // 显示2-4级标题
      label: '当前页大纲' // 文字显示
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      },
    },
    logo:'/vitepress-logo-large.svg',
    nav: [
      { text: '主页', link: '/' },
      { text: '使用指南', link: '/guide/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始使用',
          collapsed: false,
          items: [
            { text: '项目介绍', link: '/guide/introduction' },
            { text: '快速上手', link: '/guide/getting-started' },
          ]
        },
        {
          text: '开发与部署',
          collapsed: false,
          items: [
            { text: '依赖安装', link: '/guide/packages' },
            { text: 'Docker 部署', link: '/guide/deployment' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/asukaneko/vitepress-template' }
    ],

    search: {
      provider: 'local'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
    },
    editLink: {
      pattern: 'https://github.com/asukaneko/vitepress-template',
      text: '在GitHub上编辑此页'
    }
  },
  ignoreDeadLinks: true,
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    math: true,
    image: {
      // 开启图片懒加载
      lazyLoading: true
    },
    // 组件插入h1标题下
    config(md) {
      // 如果有其他的 markdown-it 插件配置可以在这里添加
    }
  },
  lastUpdated: true
})
