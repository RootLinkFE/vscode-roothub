import { commands, ExtensionContext, window } from 'vscode';
import { BrowserViewWindowManager } from './browser/BrowserViewWindowManager';
import codegenView from './webview/codegenView';
import { viewByIframe } from './webview/iframe';

function registerCommands(context: ExtensionContext) {
  //  统计

  const windowManager = new BrowserViewWindowManager(context.extensionPath);

  const commandList = [
    commands.registerCommand('roothub.openPreview', (url?) => {
      windowManager.create(url);
    }),
    commands.registerCommand('roothub.viewByIframe', (url, title) => {
      viewByIframe(title, url);
    }),
    // CodeGen 工具
    commands.registerCommand('roothub.codegenView', () => {
      codegenView(context);
    }),
    commands.registerCommand('roothub.openActiveFile', () => {
      const activeEditor = window.activeTextEditor;
      if (!activeEditor) {
        return; // no active editor: ignore the command
      }

      // get active url
      const filename = activeEditor.document.fileName;

      if (filename) {
        windowManager.create(`file://${filename}`);
      }
    }),
  ];

  context.subscriptions.push(...commandList);
}

export default registerCommands;
