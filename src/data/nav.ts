export const MAIN_NAV = [
  { label: '首页', href: '/' },
  { label: '内容导航', href: '/features/' },
  { 
    label: '博客', 
    href: '/blog/',
    children: [
      { label: 'Clash 项目介绍', href: '/blog/clash-client-download-intro/' },
      { label: 'Windows 教程', href: '/blog/clash-for-windows-tutorial/' },
      { label: 'macOS 教程', href: '/blog/clash-for-mac-tutorial/' },
      { label: 'Android 教程', href: '/blog/clash-for-android-tutorial/' },
      { label: 'iOS 教程', href: '/blog/clash-for-ios-tutorial/' }
    ]
  },
  { label: '专题', href: '/topics/' },
  { label: '品牌库', href: '/brands/' },
  { label: '对比', href: '/compare/' },
  { label: '关于', href: '/about/' },
];

export const FOOTER_NAV = {
  categories: [
    { label: '机场推荐', href: '/category/airports/' },
    { label: '教程指南', href: '/category/tutorials/' },
    { label: '软件下载', href: '/downloads/' },
  ],
  important: [
    { label: '关于我们', href: '/about/' },
    { label: '专题聚合', href: '/#topics' },
    { label: '产品对比', href: '/compare/' },
  ],
  legal: [
    { label: '免责声明', href: '/disclaimer/' },
    { label: '隐私政策', href: '/privacy/' },
  ]
};
