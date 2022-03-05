export interface SiteType {
  title: string;
  url: string;
  id: string;
}

export const TOOL_LIST = [
  {
    id: 'codegen',
    title: 'CodeGen',
    description: '根据Swagger接口文档生成TypeScript代码',
    command: 'roothub.codegenView',
    url: 'http://codegen.leekhub.com/codegen/',
    icon: 'codegen',
  },
];
