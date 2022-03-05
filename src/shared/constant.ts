import { ToolType } from './interface';

export const TOOL_LIST: ToolType[] = [
  {
    id: 'codegen',
    title: 'CodeGen',
    description: '根据Swagger接口文档生成TypeScript代码',
    command: 'roothub.codegenView',
    icon: 'codegen',
  },
  /*  {
    id: 'iframe-demo',
    title: 'CodeGen',
    description: '这个是iframe嵌入网页demo',
    command: 'roothub.viewByIframe', // 这里
    url: 'https://giscafer.com',
    icon: 'logo',
  }, */
];
