/**
 * @author giscafer
 * @homepage http://giscafer.com
 * @created 2022-03-04 15:34:46
 * @description RootHub VSCode 插件初始化
 */

import { ExtensionContext, window, workspace, ConfigurationChangeEvent } from 'vscode';
import registerCommands from './command';
import globalState from './shared/state';
import { BaseConfig } from './shared/BaseConfig';
import { ToolsProvider } from './views/ToolsProvider';

export function activate(context: ExtensionContext) {
  console.log('【RootHub】Congratulations, your extension "roothub" is now active!');
  globalState.isDevelopment = process.env.NODE_ENV === 'development';
  globalState.extensionContext = context;
  globalState.codeGenSetting = BaseConfig.getConfig('codegen.setting');
  globalState.codeGenCustomMethods = BaseConfig.getConfig('codegen.custom-method');
  const toolProvider = new ToolsProvider();
  const toolView = window.createTreeView('views.tools', {
    treeDataProvider: toolProvider
  });

  toolProvider.refresh();

  registerCommands(context);

  /*  globalState.events.addListener('refresh-view', (type) => {
    if (type === 'mark' && toolView.visible) {
      toolProvider.refresh();
    }
  }); */
}
