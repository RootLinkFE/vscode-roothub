import { commands, ExtensionContext, window, ViewColumn } from 'vscode';
import { BrowserViewWindowManager } from './browser/BrowserViewWindowManager';
import codeGenView from './webview/codegenView';
import { viewByIframe } from './webview/iframe';

function registerCommands(context: ExtensionContext) {
  const windowManager = new BrowserViewWindowManager(context.extensionPath);

  // 注册命令-swager.codegen匹配代码
  let activeTextDisposable = commands.registerCommand('roothub.codegen.AutoMatchActiveText', () => {
    // 获取当前选中的文本
    const editor = window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const text = editor.document.getText(selection);
      codeGenView(context, {
        type: 'AutoMatchActiveText',
        activeText: text,
      }); // 初始化codeGenView的webview, 向webview发送消息(选中文本)
    }
  });

  // 注册命令-swager.codegen即时搜索文本
  let searchFixedTextDisposable = commands.registerCommand(
    'roothub.codegen.SearchFixedText',
    () => {
      // 获取当前选中的文本
      const editor = window.activeTextEditor;
      if (editor) {
        const selection = editor.selection;
        const text = editor.document.getText(selection);
        codeGenView(context, {
          type: 'SearchFixedText',
          activeText: text,
        }); // 初始化codeGenView的webview, 向webview发送消息(选中文本)
      }
    }
  );

  const commandList = [
    // 基于puppeteer浏览器打开页面
    commands.registerCommand('roothub.openPreview', (url?) => {
      windowManager.create(url);
    }),
    // iframe 嵌入
    commands.registerCommand('roothub.viewByIframe', (url, title) => {
      viewByIframe(title, url);
    }),
    // CodeGen 工具
    commands.registerCommand('roothub.codegenView', () => {
      codeGenView(context);
    }),
    activeTextDisposable,
    searchFixedTextDisposable,
  ];

  context.subscriptions.push(...commandList);
}

export default registerCommands;
