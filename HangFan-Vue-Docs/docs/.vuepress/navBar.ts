import { navbar } from 'vuepress-theme-hope'

export default navbar([
  /**
   * 首页
   */
  {
    text: '首页',
    link: '/',
    icon: 'home',
  },
  /**
   * 练气 css
   */
  {
    text: '说明',
    link: '/说明',
    icon: 'shuoming',
  },
  {
    text: '版本日志',
    link: '/版本日志',
    icon: 'rizhi',
  },
])
