import { commands, ExtensionContext, window } from 'vscode';
import { BrowserViewWindowManager } from './browser/BrowserViewWindowManager';

function registerCommands(context: ExtensionContext) {
  //  统计

  const windowManager = new BrowserViewWindowManager(context.extensionPath);

  const commandList = [
    commands.registerCommand('roothub.openPreview', (url?) => {
      windowManager.create(url);
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
}

export default registerCommands;
