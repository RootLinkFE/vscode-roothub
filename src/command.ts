import { commands, ExtensionContext, window } from 'vscode';
import { BrowserViewWindowManager } from './browser/BrowserViewWindowManager';
import codeGenView from './webview/codegenView';
import { viewByIframe } from './webview/iframe';

function registerCommands(context: ExtensionContext) {
  const windowManager = new BrowserViewWindowManager(context.extensionPath);

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
  ];

  context.subscriptions.push(...commandList);
}

export default registerCommands;
