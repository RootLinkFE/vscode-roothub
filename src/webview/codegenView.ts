/*
 * @Author: ZtrainWilliams ztrain1224@163.com
 * @Date: 2022-06-08 15:07:53
 * @Description:
 */
import axios from 'axios';
import { EventEmitter } from 'events';
import { ExtensionContext, ViewColumn, Webview, window, env } from 'vscode';
import globalState from '../shared/state';
import { events, formatHTMLWebviewResourcesUrl, getTemplateFileListContent } from '../shared/utils';
import ReusedWebviewPanel from './ReusedWebviewPanel';
import { BaseConfig } from '../shared/BaseConfig';

type WebviewMessage = {
  type: string; // 消息类型
  activeText: string; // 选中文本
};

const DEV_URL = 'http://localhost:3031';

let mounted = false;

let panelEvents: EventEmitter;

function codeGenView(context: ExtensionContext, webviewMessage?: WebviewMessage) {
  const panel = ReusedWebviewPanel.create('roothub.codeGenView', `CodeGen`, ViewColumn.One, {
    enableScripts: true,
    retainContextWhenHidden: true,
  });

  if (mounted) {
    handlePostWebviewActiveText(panel.webview, webviewMessage, mounted);
    return panel;
  }
  mounted = true;
  panelEvents = new EventEmitter();
  setStorage(context, panel.webview, panelEvents);
  setCodeGenSetting(panel.webview, panelEvents);

  panel.webview.onDidReceiveMessage((message) => {
    panelEvents.emit('onDidReceiveMessage', message);
    switch (message.command) {
      case 'pageReady':
        panelEvents.emit('pageReady');
        handlePostWebviewActiveText(panel.webview, webviewMessage, false);
        return;
      case 'openInCodeSandBox':
        // TODO: 暂不知道VSCode解析html并跳转到默认浏览器
        // axios
        //   .post(message.data.url, { parameters: message.data.data.parameters })
        //   .then((response: any) => {
        //     if (response.status === 200 && response.data) {
        //       env.openExternal(response.data);
        //     }
        //   })
        //   .then(postFetchResponseFactory(panel.webview, true, message.data.sessionId));
        return;
      case 'fetch':
        console.log('「RootHub」', 'fetch:', message.data);
        const messageData = message.data;
        const url = messageData?.url;
        if (!url) {
          console.error('fetch null url');
          return;
        }
        axios({
          url: encodeURI(url),
          method: messageData.method ?? 'GET',
          headers: message.data.headers,
          data: messageData.data ?? {},
          params: messageData.params ?? {},
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
  return panel;
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
      console.log('「RootHub」', 'codgen 请求失败', response);
    }
    const { status, data } = response;

    webview.postMessage({
      command: 'fetchResponse',
      data: {
        success,
        response: data,
        sessionId,
      },
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
      data: context.globalState.get('storage') ?? {},
    });
  });
}

/**
 * @description: 初始化CodeGenCustomMethods、Setting与vscode的通信
 * @param {Webview} webview
 * @param {EventEmitter} panelEvents
 * @return {*}
 */
function setCodeGenSetting(webview: Webview, panelEvents: EventEmitter) {
  panelEvents.on('onDidReceiveMessage', (message) => {
    switch (message.command) {
      case 'saveCodeGenCustomMethods': // 自定义代码生成方法
        setcodeGenCustomMethodsCfgCb(message.data);
        return;
      case 'saveCodeGenSettings': // 保存设置数据
        console.log('saveCodeGenSettings', message);
        setcodeGenSettingsCfgCb(message.data, true);
        return;
      case 'updateCodeGenSettings': // 保存设置数据
        setcodeGenSettingsCfgCb(message.data);
        return;
    }
  });

  panelEvents.on('pageReady', () => {
    webview.postMessage({
      command: 'updateCodeGenCustomMethods',
      data: globalState.codeGenCustomMethods,
    });

    webview.postMessage({
      command: 'updateCodeGenSettings',
      data: globalState.codeGenSetting,
    });
  });

  const updateWebViewCfg = () => {
    webview.postMessage({
      command: 'updateCodeGenCustomMethods',
      data: globalState.codeGenCustomMethods,
    });

    webview.postMessage({
      command: 'updateCodeGenSettings',
      data: globalState.codeGenSetting,
    });
  };
  events.on('onDidChangeConfiguration', updateWebViewCfg);

  panelEvents.on('onDidDispose', () => {
    events.off('onDidChangeConfiguration', updateWebViewCfg);
  });
}

/**
 * 向codegenWebview推送选中文本的触发事件
 * @param webview Webview
 * @param WebviewMessage 消息数据
 */
function handlePostWebviewActiveText(
  webview: Webview,
  webviewMessage?: WebviewMessage,
  mounted?: boolean
) {
  const { activeText } = webviewMessage || {};

  activeText &&
    webview.postMessage({
      command: 'postWebviewActiveText',
      data: {
        mounted,
        ...webviewMessage,
      },
    });
}

export function setcodeGenCustomMethodsCfgCb(cfg: any[]) {
  BaseConfig.setConfig('codegen.custom-method', cfg).then(
    () => {
      window.showInformationMessage('自定义代码函数更新成功！');
      cacheCodeGenCustomMethods(cfg);
    },
    (err) => {
      console.error(err);
    }
  );
}

// 更新 codeGenCustomMethods
export function cacheCodeGenCustomMethods(remindObj: any[]) {
  globalState.codeGenCustomMethods = remindObj;
}

export function setcodeGenSettingsCfgCb(cfg: any, b?: boolean) {
  BaseConfig.setConfig('codegen.setting', cfg).then(
    () => {
      b && window.showInformationMessage('基础设置更新成功！');
      cacheCodeGenSettings(cfg);
    },
    (err) => {
      console.error(err);
    }
  );
}

// 更新 codeGenSetting
export function cacheCodeGenSettings(data: any) {
  globalState.codeGenSetting = data;
}

export default codeGenView;
