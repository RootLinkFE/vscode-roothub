export interface SiteType {
  title: string;
  url: string;
  id: string;
}

export const BLOG_CATEGORY = [
  {
    id: 'RootHub',
    title: 'RootHub',
    description: 'RootHub',
    command: 'roothub.viewByIframe',
    url: 'http://106.52.67.59:8181/overview',
    icon: 'logo',
  },
  {
    id: 'codegen',
    title: 'CodeGen',
    description: 'CodeGen',
    command: 'roothub.codegenView',
    url: 'http://codegen.leekhub.com/codegen/',
    icon: 'logo',
  },
];
