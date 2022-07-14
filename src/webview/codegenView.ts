/*
 * @Author: ZtrainWilliams ztrain1224@163.com
 * @Date: 2022-06-08 15:07:53
 * @Description:
 */
import axios from 'axios';
import { EventEmitter } from 'events';
import { ExtensionContext, ViewColumn, Webview, window } from 'vscode';
import globalState from '../shared/state';
import { events, formatHTMLWebviewResourcesUrl, getTemplateFileListContent } from '../shared/utils';
import ReusedWebviewPanel from './ReusedWebviewPanel';
import { BaseConfig } from '../shared/BaseConfig';

const DEV_URL = 'http://localhost:3031';

let mounted = false;

let panelEvents: EventEmitter;

function codeGenView(context: ExtensionContext) {
  const panel = ReusedWebviewPanel.create('roothub.codeGenView', `CodeGen`, ViewColumn.One, {
    enableScripts: true,
    retainContextWhenHidden: true
  });

  if (mounted) {
    return;
  }
  mounted = true;
  panelEvents = new EventEmitter();
  setStorage(context, panel.webview, panelEvents);
  setCodeGenSetting(panel.webview, panelEvents);

  panel.webview.onDidReceiveMessage(message => {
    panelEvents.emit('onDidReceiveMessage', message);
    switch (message.command) {
      case 'pageReady':
        panelEvents.emit('pageReady');
        return;
      case 'openInCodeSandBox':
        console.log('openInCodeSandBox', message.data);
        // TODO: 暂不知道VSCode如何实现 form action blank submit
        /*  axios
          .post(message.data.url, message.data.parameters)
          .then(postFetchResponseFactory(panel.webview, true, message.data.sessionId))
          .catch(postFetchResponseFactory(panel.webview, false, message.data.sessionId)); */
        return;
      case 'fetch':
        console.log('「RootHub」', 'fetch:', message.data);
        axios({
          url: encodeURI(message.data?.url),
          headers: message.data?.headers
        })
          .then(postFetchResponseFactory(panel.webview, true, message.data.sessionId))
          .catch(postFetchResponseFactory(panel.webview, false, message.data.sessionId));
        return;
      case 'pushStorage':
        // console.log('「RootHub」', 'pushStorage:', message.data);
        const { key, data } = message.data;
        const globalStorage: any = context.globalState.get(key);
        if (!globalStorage) {
          context.globalState.setKeysForSync([key]);
        }
        context.globalState.update(key, { ...globalStorage, ...data });
    }
  }, undefined);

  panel.onDidDispose(() => {
    panelEvents.emit('onDidDispose');
    mounted = false;
  });

  if (globalState.isDevelopment) {
    axios
      .get(DEV_URL)
      .then(res => {
        const html = res.data;
        panel.webview.html = formatHTMLWebviewResourcesUrl(html, link => {
          return DEV_URL + link;
        });
      })
      .catch(err => {
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
/**
 * vscode请求，解决跨域问题
 * https://github.com/RootLinkFE/roothub-codegen/issues/1
 * @param webview
 * @param success
 * @param sessionId
 * @returns
 */
function postFetchResponseFactory(webview: Webview, success: boolean, sessionId: string) {
  return (response: any) => {
    if (!success) {
      console.log('「RootHub」', 'codgen 请求失败');
    }
    const { status, data } = response;

    webview.postMessage({
      command: 'fetchResponse',
      data: {
        success,
        response: data,
        sessionId
      }
    });
  };
}

/**
 * setStorage 设置storage存储在webview初始化后回传
 * @param context
 * @param webview
 * @param panelEvents
 */
function setStorage(context: any, webview: Webview, panelEvents: EventEmitter) {
  panelEvents.on('pageReady', () => {
    webview.postMessage({
      command: 'updateGlobalStorage',
      data: context.globalState.get('storage') ?? {}
    });
  });
}

/**
 * @description: 初始化CodeGenCustomMethods与vscode的通信
 * @param {Webview} webview
 * @param {EventEmitter} panelEvents
 * @return {*}
 */
function setCodeGenSetting(webview: Webview, panelEvents: EventEmitter) {
  console.log('globalState: ', globalState);

  panelEvents.on('onDidReceiveMessage', message => {
    switch (message.command) {
      case 'saveCodeGenCustomMethods': // 自定义代码生成方法
        setcodeGenCustomMethodsCfgCb(message.data);
        return;
    }
  });

  panelEvents.on('pageReady', () => {
    webview.postMessage({
      command: 'updateCodeGenCustomMethods',
      data: globalState.codeGenCustomMethods
    });
  });

  const updateWebViewCfg = () => {
    console.log('updateCodeGenCustomMethods: ', globalState.codeGenCustomMethods);
    webview.postMessage({
      command: 'updateCodeGenCustomMethods',
      data: globalState.codeGenCustomMethods
    });
  };
  events.on('onDidChangeConfiguration', updateWebViewCfg);

  panelEvents.on('onDidDispose', () => {
    events.off('onDidChangeConfiguration', updateWebViewCfg);
  });
}

export function setcodeGenCustomMethodsCfgCb(cfg: Object) {
  BaseConfig.setConfig('codegen.custom-methods', cfg).then(
    () => {
      window.showInformationMessage('自定义代码函数更新成功！');
      cacheCodeGenCustomMethods(cfg);
    },
    err => {
      console.error(err);
    }
  );
}

// 更新 codeGenCustomMethods
export function cacheCodeGenCustomMethods(remindObj: Object) {
  globalState.codeGenCustomMethods = remindObj;
}

export default codeGenView;
