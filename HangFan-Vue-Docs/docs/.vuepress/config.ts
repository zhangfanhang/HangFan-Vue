import { defineUserConfig } from 'vuepress'
import theme from './theme.js'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  dest: './dist',
  title: 'HangFan-Vue',
  description:
    '一个由Vue 3 + Vue-Router + Element-Plus + Pinia打造的后台管理系统模版',
  theme,
  shouldPrefetch: false,
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
})
