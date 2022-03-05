import { ViewColumn } from 'vscode';
import { getTemplateFileContent } from '../shared/utils';
import ReusedWebviewPanel from './ReusedWebviewPanel';

export function viewByIframe(title = '前端技术文章', url: string) {
  console.log(url);
  const panel = ReusedWebviewPanel.create(
    'viewByIframe',
    title,
    ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
    }
  );
  panel.webview.onDidReceiveMessage((message) => {}, undefined);

  panel.webview.html = getTemplateFileContent('iframe.html');

  panel.webview.postMessage({
    command: 'viewIframeCommand',
    data: { url },
  });
}
