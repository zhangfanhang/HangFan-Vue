import { hopeTheme } from 'vuepress-theme-hope'
import Navbar from './navBar'

export default hopeTheme({
  hostname: 'https://hangfan-vue-docs.zfhblog.top',
  repo: 'https://github.com/zhangfanhang/HangFan-Vue',
  contributors: false,
  editLink: false,
  author: {
    name: 'Frank',
    url: 'https://zfhblog.top',
  },
  repoDisplay: false,
  iconAssets: '//at.alicdn.com/t/c/font_3796008_q021lrt7v7.css',
  logo: '/logo.png',
  pageInfo: ['Author', 'Original', 'Date', 'Category', 'ReadingTime', 'Word'],
  navbar: Navbar,
  sidebar: 'structure',
  displayFooter: false,
  breadcrumb: false,
  plugins: {
    components: ['Badge', 'CodePen', 'PDF'],
    mdEnhance: {
      codetabs: true,
      container: true,
      demo: true,
      imageSize: true,
      imageTitle: true,
      mark: true,
      tabs: true,
    },
  },
})
