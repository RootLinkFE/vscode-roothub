export interface SiteType {
  title: string;
  url: string;
  id: string;
}

export const BLOG_CATEGORY = [
  {
    id: 'ferss',
    title: 'Front-End RSS',
    description:
      '前端早读课、前端大全、前端之巅、淘宝前端、张鑫旭博客、凹凸实验室',
    command: 'roothub.openPreview',
    url: 'https://front-end-rss.now.sh',
    icon: 'rss',
  },
  {
    id: 'leerob',
    title: 'Lee Robinson',
    description:
      'Helping developers build a faster web. Teaching about web development, serverless, and React / Next.js',
    command: 'roothub.openPreview',
    url: 'https://leerob.io/blog',
    icon: 'blog',
  },
];
