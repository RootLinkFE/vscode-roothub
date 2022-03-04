/**
 * @author giscafer
 * @homepage http://giscafer.com
 * @created 2022-03-04 15:34:46
 * @description RootHub VSCode 插件
 */

import { ExtensionContext, window } from 'vscode';
import registerCommands from './command';
import globalState from './shared/state';
import { MaterialsProvider } from './views/MaterialsProvider';

export function activate(context: ExtensionContext) {
  console.log(
    '【RootHub】Congratulations, your extension "roothub" is now active!'
  );
  globalState.extensionContext = context;
  const materialProvider = new MaterialsProvider();
  const materialView = window.createTreeView('views.materials', {
    treeDataProvider: materialProvider,
  });

  materialProvider.refresh();

  registerCommands(context);

  globalState.events.addListener('refresh-view', (type) => {
    if (type === 'mark' && materialView.visible) {
      materialProvider.refresh();
    }
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
