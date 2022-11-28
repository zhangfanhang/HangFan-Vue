import { hopeTheme } from 'vuepress-theme-hope'
import Navbar from './navBar'

export default hopeTheme({
  hostname: 'https://fib.zfhblog.top',
  contributors: false,
  editLink: false,
  author: {
    name: 'Frank',
    url: 'https://zfhblog.top',
  },
  repoDisplay: false,
  iconAssets: '//at.alicdn.com/t/c/font_3750576_5p09qiy4el.css',
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
