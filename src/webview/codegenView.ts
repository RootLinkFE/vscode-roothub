import axios from 'axios';
import { EventEmitter } from 'events';
import { ExtensionContext, ViewColumn, window } from 'vscode';
import globalState from '../shared/state';
import { formatHTMLWebviewResourcesUrl, getTemplateFileListContent } from '../shared/utils';
import ReusedWebviewPanel from './ReusedWebviewPanel';

const DEV_URL = 'http://localhost:3031';

let mounted = false;

let panelEvents: EventEmitter;

function codeGenView(context: ExtensionContext) {
  const panel = ReusedWebviewPanel.create('roothub.codeGenView', `CodeGen`, ViewColumn.One, {
    enableScripts: true,
    retainContextWhenHidden: true,
  });

  if (mounted) {
    return;
  }
  mounted = true;
  panelEvents = new EventEmitter();

  panel.webview.onDidReceiveMessage((message) => {
    panelEvents.emit('onDidReceiveMessage', message);
    switch (message.command) {
      case 'pageReady':
        panelEvents.emit('pageReady');
        return;
    }
  }, undefined);

  panel.onDidDispose(() => {
    panelEvents.emit('onDidDispose');
    mounted = false;
  });

  if (globalState.isDevelopment) {
    axios
      .get(DEV_URL)
      .then((res) => {
        const html = res.data;
        panel.webview.html = formatHTMLWebviewResourcesUrl(html, (link) => {
          return DEV_URL + link;
        });
      })
      .catch((err) => {
        window.showErrorMessage(`[CodeGen 开发环境] 获取 ${DEV_URL} 失败，请先启动服务`);
      });
  } else {
    console.log(
      '「RootHub」',
      getTemplateFileListContent(['codegen', 'index.html'], panel.webview)
    );
    panel.webview.html = getTemplateFileListContent(['codegen', 'index.html'], panel.webview);
  }
}

export default codeGenView;
